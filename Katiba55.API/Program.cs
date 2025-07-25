using Katiba55.API.Extensions.DependencyInjection;
using Katiba55.API.Handlers;
using Katiba55.API.Settings;
using Katiba55.API.Transformers;
using Scalar.AspNetCore;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

#region services

builder.Services
    .AddOpenApi("v1", opt=>opt.AddDocumentTransformer<BearerSecuritySchemeTransformer>())
    .ConfigureApiBehaviorOptions()
    .AddExceptionHandler<GlobalExceptionHandler>()
    .AddProblemDetails()
    .AddDefaultCors()
    .ConfigureDB(builder.Configuration)
    .AddAutoMapper(Assembly.GetExecutingAssembly());

#endregion

#region DI

#endregion

#region configs
builder.Services
    .Configure<DBSettings>(builder.Configuration.GetSection(DBSettings.SectionName));
#endregion

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
    app.UseCors();
}

app.UseFileStorage();
app.UseHttpsRedirection();
app.UseStatusCodePagesWithReExecute("/errors/{0}");
app.UseExceptionHandler();

app.UseAuthorization();

app.MapControllers();
app.MapFallbackToFile("index.html");

app.Run();
