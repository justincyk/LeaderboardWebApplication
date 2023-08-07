package com.capstone.pingpong.players;

import java.util.HashMap;

public class EloRating {
    // Function to calculate the Probability
    static float Probability(float rating1, float rating2) {
        return 1.0f * 1.0f
                / (1
                + 1.0f
                * (float) (Math.pow(
                10, 1.0f * (rating1 - rating2)
                        / 400)));
    }

    // Function to calculate Elo rating
    // K is a constant.
    // d determines whether Player A wins
    // or Player B.
    static HashMap<String, Float> updateEloRating(String player1, String player2, float player1Rank, float player2Rank,
                                                  boolean d) {
        HashMap<String, Float> newRankings = new HashMap<>();

        // To calculate the Winning
        // Probability of Player B
        float Pb = Probability(player1Rank, player2Rank);

        // To calculate the Winning
        // Probability of Player A
        float Pa = Probability(player2Rank, player1Rank);

        // Case -1 When Player A wins
        // Updating the Elo Ratings
        if (d == true) {
            player1Rank = player1Rank + 30 * (1 - Pa);
            player2Rank = player2Rank + 30 * (0 - Pb);
        }

        // Case -2 When Player B wins
        // Updating the Elo Ratings
        else {
            player1Rank = player1Rank + 30 * (0 - Pa);
            player2Rank = player2Rank + 30 * (1 - Pb);
        }

        newRankings.put(player1, player1Rank);
        newRankings.put(player2, player2Rank);

        return newRankings;
    }
}
