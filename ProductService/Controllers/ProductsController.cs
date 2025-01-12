using Microsoft.AspNetCore.Mvc;
using ProductService.Models;
using ProductService.Data;
using StackExchange.Redis;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System;
using Microsoft.EntityFrameworkCore;

namespace ProductService.Controllers
{
    [Route("api/products")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ProductDbContext _context;
        private readonly IDatabase _redisDb;

        public ProductsController(ProductDbContext context, IConnectionMultiplexer redis)
        {
            _context = context;
            _redisDb = redis.GetDatabase();
        }

        // Endpoint: Get all products
        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            var cacheKey = "products";
            var cachedProducts = await _redisDb.StringGetAsync(cacheKey);

            //if (!string.IsNullOrEmpty(cachedProducts))
            //{
            //    return Ok(System.Text.Json.JsonSerializer.Deserialize<List<Product>>(cachedProducts));
            //}

            var products = _context.Products.ToList();
            await _redisDb.StringSetAsync(cacheKey, System.Text.Json.JsonSerializer.Serialize(products), TimeSpan.FromMinutes(10));

            return Ok(products);
        }

        // Endpoint: Get product by ID
        [HttpGet("{id}")]
        public IActionResult GetProduct(int id)
        {
            var product = _context.Products.Find(id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        // Endpoint: Create a new product
        [HttpPost]
        public IActionResult CreateProduct(Product product)
        {
            if (product == null)
            {
                return BadRequest("Invalid product data.");
            }

            _context.Products.Add(product);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
        }

        // Endpoint: Update an existing product by ID
        [HttpPut("{id}")]
        public IActionResult UpdateProduct(int id, Product updatedProduct)
        {
            if (updatedProduct == null || id != updatedProduct.Id)
            {
                return BadRequest("Invalid product data.");
            }

            var product = _context.Products.Find(id);
            if (product == null)
            {
                return NotFound();
            }

            // Update product properties
            product.Name = updatedProduct.Name;
            product.Description = updatedProduct.Description;
            product.Price = updatedProduct.Price;
            product.Category = updatedProduct.Category;
            product.ImageUrl = updatedProduct.ImageUrl;
            product.Quantite = updatedProduct.Quantite;

            _context.SaveChanges();
            return Ok(product);
        }

        // Endpoint: Delete a product by ID
        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(int id)
        {
            var product = _context.Products.Find(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            _context.SaveChanges();
            return NoContent();
        }

        // Endpoint: Upload an image and return its URL
        [HttpPost("upload")]
        public async Task<IActionResult> UploadImage(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("Aucun fichier sélectionné.");
            }

            var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images");
            Directory.CreateDirectory(folderPath);

            var filePath = Path.Combine(folderPath, file.FileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var fileUrl = $"{Request.Scheme}://{Request.Host}/images/{file.FileName}";
            return Ok(new { Url = fileUrl });
        }
    }
}
