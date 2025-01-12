using Microsoft.EntityFrameworkCore;
using OrderService.Data;
using OrderService.Services;


var builder = WebApplication.CreateBuilder(args);

// Configuration de la base de données
builder.Services.AddDbContext<OrderDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));



// Ajout des services nécessaires
builder.Services.AddScoped<OrderConsumer>();
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
    options.ListenAnyIP(7022); // Écoute sur toutes les interfaces au port 7022
});

var app = builder.Build();

// Utilisez un scope pour résoudre le service OrderConsumer
using (var scope = app.Services.CreateScope())
{
    var orderConsumer = scope.ServiceProvider.GetRequiredService<OrderConsumer>();
    orderConsumer.StartListening();
}

// Middleware et pipelines
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll"); // Activer CORS
app.UseAuthorization();
app.MapControllers();

app.Run();
