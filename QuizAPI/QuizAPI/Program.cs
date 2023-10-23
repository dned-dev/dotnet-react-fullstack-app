
using Microsoft.EntityFrameworkCore;
using QuizAPI.Models;
using System.Data.Common;

using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();
builder.Services.AddConnections();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddHttpContextAccessor();
builder.Services.AddCors();
builder.Services.AddSwaggerGen();

builder.Services.AddControllers();


// dependency injections of the DbContext
builder.Services.AddDbContext<QuizDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DevConnection"))
); 


var app = builder.Build();

// enable cors to allow the front-end to make requests to this API
app.UseCors(options => 
    options.WithOrigins("http://localhost:3000")
    .AllowAnyMethod()
    .AllowAnyHeader());




// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
}

app.UseSwagger();
    
app.UseSwaggerUI();

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(Path.Combine(builder.Environment.ContentRootPath, "Images")),
    RequestPath = "/Images"


});

app.UseRouting();

app.UseAuthorization();

app.MapRazorPages();

app.UseAuthorization();

app.MapControllers();

app.Run();
