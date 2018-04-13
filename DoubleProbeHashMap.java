/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package A3Q2;

/**
 *
 * @author elder
 */
public class DoubleProbeHashMap<K, V> extends ProbeHashMap<K, V> {

	int q; // Prime number of secondary hash

	// provide same constructors as base class
	/**
	 * Creates a hash table with capacity 17, prime factor 109345121 and secondary
	 * prime factor q = 13.
	 */
	public DoubleProbeHashMap() {
		super();
		q = 13; // largest prime less than 17
	}

	/**
	 * Creates a hash table with the given capacity cap, prime factor 109345121 and
	 * secondary prime factor q equal to the largest prime less than cap. Cap must
	 * be at least 3 otherwise an Exception is thrown.
	 */
	public DoubleProbeHashMap(int cap) throws Exception {
		super(cap);
		if (cap < 3) {
			throw new Exception();
		}
		q = selectSecondaryHashPrime(cap);
	}

	/**
	 * Creates a hash table with the given capacity and prime factor, and secondary
	 * prime factor q equal to the largest prime less than capacity. Cap must be at
	 * least 3 otherwise an Exception is thrown.
	 */
	public DoubleProbeHashMap(int cap, int p) throws Exception {
		super(cap, p);
		if (cap < 3) {
			throw new Exception();
		}
		q = selectSecondaryHashPrime(cap);
	}

	/**
	 * Updates the size of the hash table to be at least newCap and rehashes all
	 * entries. Must also update secondary prime factor q.
	 */
	protected void resize(int newCap) {
		// Implement this method. Note that you can make use of the resize
		// method of probleHashMap with a super.resize call.
		System.out.println("****\nB4 resize H2: " + secondaryHashValue((K) "12799"));
		super.resize(newCap);
		q = selectSecondaryHashPrime(newCap);
		System.out.println("****\nAfter resize H2: " + secondaryHashValue((K) "12799"));
	}

	/**
	 * Searches for an entry with key equal to k (which is known to have primary
	 * hash value h1), returning the index at which it was found, or returning
	 * -(a+1) where a is the index of the first empty or available slot that can be
	 * used to store a new such entry. Uses secondary hashing function h’(k) = q -
	 * k mod q, where the secondary prime factor q is the smallest prime less than
	 * the current capacity.
	 *
	 * @param h1
	 *            the precalculated hash value of the given key
	 * @param k
	 *            the key
	 * @return index of found entry or if not found
	 */
	protected int findSlot(int h1, K k) {
		// modify the findSlot method of probeHashMap to use double hashing
		int avail = -1; // no slot available (thus far)
		int j = h1; // index while scanning table
		int i = 0;
		int h2 = Math.abs(secondaryHashValue(k));

		// Tajbir
		if (k.equals("Rono Philemon M25-29") || k.equals("Revelo Xavier M30-34") || k.equals("Andrews Katie F30-34")
				|| k.equals("Arce Juan M35-39") || k.equals("Theriault Pierre M45-49")) {
			System.out.println("H1 ---> " + h1 + "\tH2 ---> " + h2);
		}
		// Tajbir

		do {
			totalProbes++;
			if (isAvailable(j)) { // may be either empty or defunct
				if (avail == -1) {
					avail = j; // this is the first available slot!
				}
				if (table[j] == null) {
					break; // if empty, search fails immediately
				}
			} else if (table[j].getKey().equals(k)) {
				System.out.println("Get J --> " + j);
				return j; // successful match
			}
			j = (h1 + (i * h2)) % capacity; // keep looking (DH)
			i++;
			if (k.equals("Rono Philemon M25-29") || k.equals("Revelo Xavier M30-34") || k.equals("Andrews Katie F30-34")
					|| k.equals("Arce Juan M35-39") || k.equals("Theriault Pierre M45-49")) {
				System.out.println("J --> " + j);
			}

		} while (table[j] != null); // stop if we can't find a space

		
		if (isAvailable(j)) { // may be either empty or defunct
			if (avail == -1) {
				avail = j; // this is the first available slot!
			}
		}
		// Tajbir
				if (k.equals("Rono Philemon M25-29") || k.equals("Revelo Xavier M30-34") || k.equals("Andrews Katie F30-34")
						|| k.equals("Arce Juan M35-39") || k.equals("Theriault Pierre M45-49")) {
					System.out.println("Avail --> " + avail + "\ti: " + i);
				}
				// Tajbir
		return -(avail + 1);
		// return (table[j] == null && avail == -1) ? -(j + 1) : -(avail + 1); // search has failed
	}

	/**
	 * Returns value of secondary hash function h’(k) = q - k mod q, where k is
	 * the hash code for key (i.e. key.hashCode()).*
	 */
	public int secondaryHashValue(K key) {
		// implement this method
		return (int)(q - (Math.abs(key.hashCode()) % q));
	}

	// Selects secondary hash prime to be the largest prime less than cap
	int selectSecondaryHashPrime(int cap) {
		//
		for (int i = cap - 1; i > 0; i--) {
			if (isPrime(i)) {
				return i;
			}
		}
		return 1;
	}

}
