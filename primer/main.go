package main

import (
	"fmt"
	"math/rand"
	"time"
)

func f(n int) {
	for i := 0; i < 10; i++ {
		fmt.Println(n, ":", i)
		amt := time.Duration(rand.Intn(250))
		time.Sleep(time.Millisecond * amt)
	}
}

// main is a go routine
func main() {

	// go routines
	// run a function and move on to the next line, even when that first function
	// hasn't completed
	for i := 0; i < 3; i++ {
		go f(i) // <--- this is the go routine #2
	}
	var input string
	fmt.Scanln(&input)

}
