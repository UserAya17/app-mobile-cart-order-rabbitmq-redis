using CartService.Services;
using StackExchange.Redis;
using CartService.Models;
using CartService.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Configuration de la base de données
builder.Services.AddDbContext<ProductDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Configuration de Redis
builder.Services.AddSingleton<IConnectionMultiplexer>(sp =>
{
    return ConnectionMultiplexer.Connect("localhost"); // Utilisation locale de Redis
});

// Ajout des services nécessaires
builder.Services.AddScoped<ICartService, CartsService>();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configuration CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Configuration Kestrel pour écouter sur toutes les interfaces
builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenAnyIP(5281); // Écoute sur localhost et 192.168.31.191
});

var app = builder.Build();

// Middleware et pipelines
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll"); // Activer CORS
app.MapControllers();
app.Run();