# Go Primer


A few steps to get you started in go.

## Go: in a nutshell

- compiled, object oriented language
- created at Google in 2009
- free, open source
- concurrent, at its core
- garbage collected

> Whole point is to solve problems with other languages
- fast compilation
- package management (go get)
- rich support for concurrency using goroutines and channels

go routines:
run a function and move on to the next line, even when that first function has not finished executing

channels:
provide a way for 2 goroutines to talk to each other and synchronize their execution

## Why go

<3 APIs <3
CLI tools

### Let's get started

0. Start here to get a quick peek at the language

```
https://tour.golang.org/welcome/1
```
Like it? Keep GO-ing! ;)

1. Set up your Go Workspace

```
https://www.ardanlabs.com/blog/2016/05/installing-go-and-your-workspace.html
```

Make sure you have set your environment variables.
Check with go env:

```
cathleens-MacBook-Pro:primer cathleenturner$ go env
GOARCH="amd64"
GOBIN=""
GOCACHE="/Users/cathleenturner/Library/Caches/go-build"
GOEXE=""
GOHOSTARCH="amd64"
GOHOSTOS="darwin"
GOOS="darwin"
GOPATH="/Users/cathleenturner/code/rio/go"
GORACE=""
GOROOT="/usr/local/Cellar/go/1.10.2/libexec"
GOTMPDIR=""
GOTOOLDIR="/usr/local/Cellar/go/1.10.2/libexec/pkg/tool/darwin_amd64"
GCCGO="gccgo"
CC="clang"
CXX="clang++"
CGO_ENABLED="1"
CGO_CFLAGS="-g -O2"
CGO_CPPFLAGS=""
CGO_CXXFLAGS="-g -O2"
CGO_FFLAGS="-g -O2"
CGO_LDFLAGS="-g -O2"
PKG_CONFIG="pkg-config"
GOGCCFLAGS="-fPIC -m64 -pthread -fno-caret-diagnostics -Qunused-arguments -fmessage-length=0 -fdebug-prefix-map=/var/folders/ft/dn2cd_l50tj1gc29nbnqwhhm0000gn/T/go-build175745745=/tmp/go-build -gno-record-gcc-switches -fno-common"
```

Make sure you add your go path to your $PATH variable!
I like to add it to my .bash_profile file
(this handy file is run everytime you open a new terminal)

```
# (.bash_profile)

# set up for go
export GOPATH="$HOME/code/rio/go"
export PATH="$PATH:$GOPATH/bin"
export PATH=$PATH:/usr/local/go/bin

```



2. A few basics

i. you download packages using go get

```
go get -u github.com/davecgh/go-spew/spew
```

ii. Language Basics

```
https://github.com/GoesToEleven/GolangTraining
```

iii. Level up with projects

```
https://gophercises.com/
```


3. GO to Workshop June 30th to learn more about go lang!

```
https://www.bridgetroll.org/events/435
```


4. Demo - Go Routines






