using Ocelot.DependencyInjection;
using Ocelot.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Ajouter le fichier de configuration Ocelot
builder.Configuration.AddJsonFile("ocelot.json", optional: false, reloadOnChange: true);

// Ajouter les services n�cessaires pour Ocelot
builder.Services.AddOcelot();

var app = builder.Build();

// D�finir l'URL d'�coute pour l'API Gateway
app.Urls.Add("http://192.168.22.97:5080");

// Utiliser Ocelot comme middleware
await app.UseOcelot();

app.Run();
