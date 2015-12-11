package com.spc;

import java.io.File;
import java.util.ArrayList;
import java.util.Scanner;

public class Main {

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

        int answer = 0;
        int partTwo = 0;

        for (String instruction:input) {
            String[] dimens = instruction.split("x");
            int wid = Integer.parseInt(dimens[0]);
            int hei = Integer.parseInt(dimens[1]);
            int len = Integer.parseInt(dimens[2]);

            int sideOne = wid*hei;
            int sideOnePerimeter = ((2*wid)+(2*hei));
            int sideTwo = hei*len;
            int sideTwoPerimeter = ((2*hei)+(2*len));
            int sideThree = wid*len;
            int sideThreePerimeter = ((2*wid)+(2*len));

            int volume = (wid*hei*len);

            int smallestSide = sideOne;
            int smallestPerimeter = sideOnePerimeter;

            if(sideTwo < smallestSide) {
                smallestSide = sideTwo;
                smallestPerimeter = sideTwoPerimeter;
            }

            if(sideThree < smallestSide) {
                smallestSide = sideThree;
                smallestPerimeter = sideThreePerimeter;
            }

            answer += ((2*sideOne) + (2*sideTwo) + (2*sideThree) + smallestSide);
            partTwo += (smallestPerimeter + volume);
        }

        System.out.println("Part 1: " + answer);
        System.out.println("Part 2: " + partTwo);
    }
}
