using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Premier_League.Data;
using Premier_League.Models;

namespace Premier_League.Infrastructure
{
    public static class IdentityConfigurationExtensions
    {
        public static IdentityBuilder AddIdentity(this IServiceCollection services)
        {
            return services
                .AddDefaultIdentity<ApplicationUser>(options =>
                {
                    options.Password.RequireDigit = false;
                    options.Password.RequireLowercase = false;
                    options.Password.RequireUppercase = false;
                    options.Password.RequireNonAlphanumeric = false;
                    options.Password.RequiredLength = 3;
                    options.SignIn.RequireConfirmedAccount = true;
                })
                .AddEntityFrameworkStores<ApplicationDbContext>();
        }

        public static AuthenticationBuilder AddGoogleAuthentication(this IServiceCollection services, IConfiguration configuration)
        {
            return services
                .AddAuthentication()
                .AddGoogle(options =>
                {
                    IConfigurationSection googleAuth = configuration.GetSection("Authentication:Google");

                    options.ClientId = googleAuth["ClientId"];
                    options.ClientSecret = googleAuth["ClientSecret"];
                });
        }

        public static AuthenticationBuilder AddFacebookAuthentication(this IServiceCollection services, IConfiguration configuration)
        {
            return services
                .AddAuthentication()
                .AddFacebook(options =>
                {
                    IConfigurationSection facebookAuth = configuration.GetSection("Authentication:Facebook");

                    options.AppId = facebookAuth["AppId"];
                    options.AppSecret = facebookAuth["AppSecret"];
                });
        }
    }
}
