package main

import (
	"flag"
	"fmt"
	"go/ast"
	"go/parser"
	"go/token"
	"os"
	"strings"
)

type Result struct {
	FuncName string
}

func main() {
	var (
		filePath = flag.String("file", "", "file path")
		line     = flag.Int("line", 0, "file line")
	)
	flag.Parse()

	if *filePath == "" {
		fmt.Fprintln(os.Stderr, "file is required")
		os.Exit(1)
	}

	result, err := findNearestTestFuncByLine(*filePath, *line)
	if err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}

	if result.FuncName == "" {
		fmt.Fprintf(os.Stderr, "No test found at line %d in %s\n", *line, *filePath)
		os.Exit(1)
	}

	fmt.Println(result.FuncName)
}

func findNearestTestFuncByLine(filePath string, line int) (*Result, error) {
	body, err := os.ReadFile(filePath)
	if err != nil {
		return nil, err
	}

	fset := token.NewFileSet() // positions are relative to fset
	f, err := parser.ParseFile(fset, "", string(body), 0)
	if err != nil {
		return nil, err
	}

	result := &Result{}

	for _, d := range f.Decls {
		if fd, ok := d.(*ast.FuncDecl); ok {
			if strings.HasPrefix(fd.Name.String(), "Test") {
				pos := fset.Position(fd.Pos())
				endpos := fset.Position(fd.End())

				if pos.Line <= line && line < endpos.Line {
					result.FuncName = fd.Name.String()
					break
				}
			}
		}
	}

	return result, nil
}

func TestHoge() {
	fmt.Println("TestHoge")
}

func TestFuga() {
	fmt.Println("TestFuga")
}
