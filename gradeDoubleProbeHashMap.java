package A3Q2;

/**
 * Grades DoubleProbeHashMap
 * Note that there are 12 duplicate names, so only 3,726 of the 3,738 runners 
 * are actually stored in the database.
 *
 * @author jameselder
 */
public class gradeDoubleProbeHashMap {

    public static void main(String[] args) throws Exception {
        AsciiReader marathonReader;
        Object[] Format = {Integer.class, String.class,
            String.class, String.class, String.class, String.class};
        Object[] result;
        //ProbeHashMap<String, MarathonRunner> marathonMap = new ProbeHashMap<>(7500);
        DoubleProbeHashMap<String, MarathonRunner> marathonMap = new DoubleProbeHashMap<>(7500);
        MarathonRunner marathonRunner;

        int[] marks = new int[7];
        int testNum = 0;
        int nCorrect = 0;
        int nRunners;
        String[] runnerNames = {"Rono Philemon M25-29","Revelo Xavier M30-34","Andrews Katie F30-34",
            "Arce Juan M35-39","Theriault Pierre M45-49"};
        int[] places = {1,296,606,1084,3754};

        long startTime = System.nanoTime();  //Start measurement of execution time once we have something in the tree

        try {
            marathonReader = new AsciiReader("marathon2017.csv");	System.out.println("Put H2: " + marathonMap.secondaryHashValue("12799"));
            do {
                result = marathonReader.ReadLine(Format, ",");
                if (result != null) {
                    marathonRunner = new MarathonRunner((Integer) result[0],
                            (String) result[1], (String) result[2], 
                            (String) result[3], (String) result[4],
                            (String) result[5]
                    );
                    if(marathonRunner.getPlace() == 1 || marathonRunner.getPlace() == 296 || marathonRunner.getPlace() == 606 || marathonRunner.getPlace() == 1084 || marathonRunner.getPlace() == 3754) {
                    	System.out.println(marathonRunner.toString());
                    }
                    try { //use name and category as key
                        marathonMap.put((String) result[3] + " " + (String) result[4] + " " + (String) result[5], marathonRunner);
                    } catch (Exception ex) {
                        System.out.println("Incorrect: DoubleProbeHashMap.put threw an exception.");
                    }
                }
            } while (result != null);
        } catch (Exception x) {
            System.out.println("File not found");
        }

        //Test case 1:  verify number of runners in map
        System.out.print("Test Case " + ++testNum + ": "); 	System.out.println("After Put H2: " + marathonMap.secondaryHashValue("12799"));
        nRunners = marathonMap.size();
        System.out.println("There are " + nRunners + " runners in the database.");
        if (nRunners == 3955) {
                marks[testNum] = 1;
                System.out.println("Outcome:  Passed.");
        } else {            
                System.out.println("Outcome:  Failed.");
            }

        //Test cases 2-7
        System.out.println("Starting Get . . . .");		System.out.println("Get H2: " + marathonMap.secondaryHashValue("12799"));
        for (testNum = 2; testNum < 7; testNum++) {
            System.out.print("Test Case " + testNum + ": ");
            try {
                marathonRunner = marathonMap.get(runnerNames[testNum - 2]);
                if (marathonRunner.getPlace() == places[testNum - 2]) {
                    marks[testNum] = 1;
                    System.out.println("Runner " + marathonRunner.getFirstName()
                            + " " + marathonRunner.getLastName() + " placed "
                            + marathonRunner.getPlace() + " out of "
                            + marathonMap.size() + " runners.");
                    System.out.println("Outcome:  Passed.");
                } else {
                    System.out.println("Outcome:  Failed.");
                }

            } catch (Exception ex) {
                System.out.println("Incorrect: DoubleProbeHashMap.get threw an exception." + ex);
            }
        }
        System.out.println("Total Probes: " + marathonMap.getTotalProbes());

        System.out.println("");

        long stopTime = System.nanoTime();
        double elapsedTime = (double) (stopTime - startTime) / 1000000; //in msec
        System.out.println("Execution Time (msec): " + elapsedTime);

        System.out.print("Test Case Summary: ");
        for (int i = 1; i < marks.length; i++) {
            System.out.print(marks[i] + " ");
            nCorrect += marks[i];
        }
        System.out.println();
        System.out.println("Test Case Grade: " + (double) nCorrect / (marks.length - 1));
        
        /* Tajbir
        for (int i = 1; i <= 5; i++) {
        	System.out.println("H2: " + marathonMap.secondaryHashValue("12799"));
        }
        */ //Tajbir

    }
}
