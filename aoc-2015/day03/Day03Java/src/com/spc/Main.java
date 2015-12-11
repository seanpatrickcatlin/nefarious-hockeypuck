package com.spc;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Scanner;

public class Main {

    private static String getKey(int xCoord, int yCoord) {
        return String.format("%d,%d", xCoord, yCoord);
    }

    private static void solvePartOne(ArrayList<String> input) {
        HashMap<String, Integer> visitedHouses = new HashMap<>();

        String instructions = input.get(0);

        int currentX = 0;
        int currentY = 0;

        String thisKey = getKey(currentX, currentY);

        Integer currentValue = visitedHouses.get(thisKey);

        if(currentValue == null) {
            visitedHouses.put(thisKey, 1);
        }

        for (int i=0; i<instructions.length(); i++) {
            char direction = instructions.charAt(i);

            if(direction == '^') {
                currentY++;
            } else if(direction == 'v') {
                currentY--;
            } else if(direction == '<') {
                currentX--;
            } else if(direction == '>') {
                currentX++;
            }

            thisKey = getKey(currentX, currentY);

            currentValue = visitedHouses.get(thisKey);

            if(currentValue == null) {
                visitedHouses.put(thisKey, 1);
            } else {
                currentValue++;
                visitedHouses.put(thisKey, currentValue);
            }
        }

        System.out.println("Part 1: " + visitedHouses.size());
    }

    private static void solvePartTwo(ArrayList<String> input) {
        HashMap<String, Integer> visitedHouses = new HashMap<>();

        String instructions = input.get(0);

        int currentX = 0;
        int currentY = 0;

        int santaX = 0;
        int santaY = 0;
        int roboX = 0;
        int roboY = 0;

        String thisKey = getKey(currentX, currentY);

        Integer currentValue = visitedHouses.get(thisKey);

        if(currentValue == null) {
            visitedHouses.put(thisKey, 1);
        }

        for (int i=0; i<instructions.length(); i++) {
            char direction = instructions.charAt(i);

            if((i%2) == 0) {
                if (direction == '^') {
                    santaY++;
                } else if (direction == 'v') {
                    santaY--;
                } else if (direction == '<') {
                    santaX--;
                } else if (direction == '>') {
                    santaX++;
                }

                currentX = santaX;
                currentY = santaY;
            } else {
                if (direction == '^') {
                    roboY++;
                } else if (direction == 'v') {
                    roboY--;
                } else if (direction == '<') {
                    roboX--;
                } else if (direction == '>') {
                    roboX++;
                }

                currentX = roboX;
                currentY = roboY;
            }

            thisKey = getKey(currentX, currentY);

            currentValue = visitedHouses.get(thisKey);

            if(currentValue == null) {
                visitedHouses.put(thisKey, 1);
            } else {
                currentValue++;
                visitedHouses.put(thisKey, currentValue);
            }
        }

        System.out.println("Part 2: " + visitedHouses.size());
    }

    public static void main(String[] args) {
        if(args.length == 0) {
            System.out.println("Usage java Main <filename>");
            return;
        }

        String fileName = args[0];

        ArrayList<String> input = new ArrayList<>();

        try {
            File f = new File(fileName);

            Scanner s = new Scanner(f);

            while(s.hasNextLine()) {
                input.add(s.nextLine());
            }

            s.close();
        } catch(Exception e) {
            System.out.println("Exception: " + e.toString());
            return;
        }

        solvePartOne(input);
        solvePartTwo(input);
    }
}
