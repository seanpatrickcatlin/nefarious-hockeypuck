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

        int floor = 0;
        int posForPartTwo = 0;

        String instructions = input.get(0);

        for(int i=0; i<instructions.length(); i++) {
            if(instructions.charAt(i) == '(') {
                floor++;
            }

            if(instructions.charAt(i) == ')') {
                floor--;
            }

            if((posForPartTwo == 0) && (floor == -1)) {
                posForPartTwo = i+1;
            }
        }

        System.out.println("Floor: " + floor);
        System.out.println("Part 2: " + posForPartTwo);
    }
}
