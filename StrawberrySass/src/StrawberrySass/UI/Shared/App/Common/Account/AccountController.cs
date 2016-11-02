﻿using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using StrawberrySass.Models;

namespace StrawberrySass.UI.Shared.App.Common.Account
{
    public class AccountController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly ILogger _logger;

        public AccountController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            ILoggerFactory loggerFactory)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _logger = loggerFactory.CreateLogger<AccountController>();
        }

        [Route("templates/shared/login")]
        public IActionResult LoginComponent() => PartialView("~/UI/Shared/App/Common/Account/LoginComponent.cshtml");

        [Route("templates/shared/register")]
        public IActionResult RegisterComponent() => PartialView("~/UI/Shared/App/Common/Account/RegisterComponent.cshtml");

        [HttpPost]
        [Route("api/account/login")]
        public async Task<IActionResult> Login([FromBody] Account model)
        {
            if (!ModelState.IsValid) return BadRequest();

            var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, isPersistent: false, lockoutOnFailure: false);

            if (!result.Succeeded) return BadRequest();

            _logger.LogInformation(1, "User logged in.");

            return Json(model);
        }

        [HttpPost]
        [Route("api/account/register")]
        public async Task<IActionResult> Register([FromBody] Account model)
        {
            if (!ModelState.IsValid) return BadRequest();

            var user = new ApplicationUser { UserName = model.Email, Email = model.Email };
            var result = await _userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded) return BadRequest();

            await _signInManager.SignInAsync(user, isPersistent: false);
            _logger.LogInformation(3, "User created a new account with password.");

            return Json(user);
        }
    }
}
