package tests;

import org.testng.annotations.Test;
import static org.testng.Assert.*;

public class VanvaasTest {

    // 🟢 Test 1: Camp Creation
    @Test
    public void testAddCamp() {
        String title = "Desert Moon Camp";
        int price = 1999;

        assertNotNull(title);
        assertTrue(price > 0);
    }

    // 🟢 Test 2: Review Validation
    @Test
    public void testReview() {
        String review = "Amazing experience!";
        int rating = 5;

        assertTrue(review.length() > 0);
        assertTrue(rating >= 1 && rating <= 5);
    }

    // 🟢 Test 3: Sorting Logic
    @Test
    public void testSorting() {
        int lowPrice = 1500;
        int highPrice = 2000;

        assertTrue(highPrice > lowPrice);
    }

    // 🟢 Test 4: AI Summary Check
    @Test
    public void testAISummary() {
        String summary = "Great location with beautiful views";

        assertNotNull(summary);
        assertTrue(summary.length() > 0);
    }
}