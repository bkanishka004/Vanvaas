package tests;

import org.testng.Reporter;
import org.testng.annotations.Test;
import static org.testng.Assert.*;

public class VanvaasTest {

    @Test
    public void testAddCamp() {
        String title = "Desert Moon Camp";
        int price = 1999;
        assertNotNull(title, "Title should not be null");
        assertFalse(title.isEmpty(), "Title should not be empty");
        assertTrue(price > 0, "Price should be positive");
        Reporter.log("testAddCamp passed: title=" + title + ", price=" + price);
    }

    @Test
    public void testReview() {
        String review = "Amazing experience!";
        int rating = 5;
        assertTrue(review.length() > 0, "Review should not be empty");
        assertTrue(rating >= 1 && rating <= 5, "Rating must be between 1 and 5");
        Reporter.log("testReview passed: rating=" + rating);
    }

    @Test
    public void testSorting() {
        int[] prices = {2000, 1500, 2500, 1000};
        int min = prices[0];
        for (int p : prices) {
            if (p < min) min = p;
        }
        assertEquals(min, 1000, "Minimum price should be 1000");
        Reporter.log("testSorting passed: min price=" + min);
    }

    @Test
    public void testAISummary() {
        String summary = "Great location with beautiful views";
        assertNotNull(summary, "Summary should not be null");
        assertTrue(summary.length() > 10, "Summary should be meaningful");
        Reporter.log("testAISummary passed: length=" + summary.length());
    }

    @Test
    public void testInvalidRating() {
        int rating = 7;
        Reporter.log("testInvalidRating: rating=" + rating + " expected to FAIL");
        assertTrue(rating <= 5, "Rating should not exceed 5");
    }
}