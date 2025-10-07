package main

import "testing"

func TestFindNearestTestFuncByLine(t *testing.T) {
	type test struct {
		file     string
		line     int
		funcName string // Blank to not found
	}
	tests := []test{
		{file: "testdata/test.go", line: 3, funcName: "TestHoge"},
		{file: "testdata/test.go", line: 6, funcName: "TestHoge"},
		{file: "testdata/test.go", line: 9, funcName: ""}, // blank line
		{file: "testdata/test.go", line: 11, funcName: "TestFuga"},
		{file: "testdata/test.go", line: 20, funcName: ""},
	}
	for _, test := range tests {
		result, err := findNearestTestFuncByLine(test.file, test.line)
		if err != nil {
			t.Fatal(err)
		}
		if result.FuncName != test.funcName {
			t.Fatal("expected", test.funcName, "but got", result.FuncName)
		}
	}
}
