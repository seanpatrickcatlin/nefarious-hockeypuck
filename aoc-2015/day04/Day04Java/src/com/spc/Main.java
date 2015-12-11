package com.spc;

import java.io.File;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.util.ArrayList;
import java.util.Scanner;

public class Main {
    private  static String getMd5Hash(String inputString) {
        String hashText = "";
        // http://stackoverflow.com/a/421696
        try {
            MessageDigest m = MessageDigest.getInstance("MD5");
            m.reset();
            m.update(inputString.getBytes());
            byte[] digest = m.digest();
            BigInteger bigInt = new BigInteger(1, digest);
            hashText = bigInt.toString(16);
        } catch(Exception e) {
            System.out.println("Exception: " + e.toString());
            while(hashText.length() < 32 ){
                hashText = "X"+hashText;
            }
        }

        // Now we need to zero pad it if you actually want the full 32 chars.
        while(hashText.length() < 32 ){
            hashText = "0"+hashText;
        }

        return hashText;
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

        String baseString = input.get(0);

        System.out.println("input: " + baseString);

        String md5Hash = "";

        int number = -1;

        while(!md5Hash.startsWith("00000")) {
            number++;
            md5Hash = getMd5Hash(baseString + number);
        }

        System.out.println("Part 1: " + number);

        while(!md5Hash.startsWith("000000")) {
            number++;
            md5Hash = getMd5Hash(baseString + number);
        }

        System.out.println("Part 2: " + number);
    }
}
