const { Builder, By, until } = require("selenium-webdriver");

async function runTests() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    console.log("Opening Home Page...");
    await driver.get("http://localhost:3000");
    await driver.sleep(2000);

    // ================= REGISTER =================
    console.log("Testing Register...");
    await driver.get("http://localhost:3000/register");

    await driver.findElement(By.name("username")).sendKeys("testuser");
    await driver.findElement(By.name("email")).sendKeys("test@test.com");
    await driver.findElement(By.name("password")).sendKeys("123456");

    await driver.findElement(By.css("button[type='submit']")).click();

    await driver.wait(until.urlContains("login"), 5000);
    console.log("Register Test Passed ✅");

    // ================= LOGIN =================
    console.log("Testing Login...");
    await driver.get("http://localhost:3000/login");

    await driver.findElement(By.name("username")).sendKeys("testuser");
    await driver.findElement(By.name("password")).sendKeys("123456");

    await driver.findElement(By.css("button[type='submit']")).click();

    await driver.wait(until.urlIs("http://localhost:3000/"), 5000);
    console.log("Login Test Passed ✅");

    // ================= ADD CAMP =================
    console.log("Testing Add Camp...");
    await driver.get("http://localhost:3000/camps/new");

    await driver.findElement(By.name("title")).sendKeys("Test Camp");
    await driver.findElement(By.name("location")).sendKeys("Himachal");
    await driver
      .findElement(By.name("image"))
      .sendKeys(
        "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600",
      );
    await driver.findElement(By.name("price")).sendKeys("1200");
    await driver
      .findElement(By.name("description"))
      .sendKeys("Beautiful automated test campground.");

    let submitBtn = await driver.findElement(By.css("button[type='submit']"));
    await driver.executeScript("arguments[0].scrollIntoView(true);", submitBtn);
    await driver.sleep(1000);
    await driver.executeScript("arguments[0].click();", submitBtn);

    await driver.wait(until.urlContains("campgrounds"), 5000);
    console.log("Add Camp Test Passed ✅");

    // ================= LOGOUT =================
    console.log("Testing Logout...");
    await driver.findElement(By.linkText("Logout")).click();

    await driver.wait(until.urlIs("http://localhost:3000/"), 5000);
    console.log("Logout Test Passed ✅");

    console.log("🎉 ALL TESTS PASSED SUCCESSFULLY 🎉");
  } catch (err) {
    console.error("Test Failed ❌", err);
  } finally {
    await driver.quit();
  }
}

runTests();
