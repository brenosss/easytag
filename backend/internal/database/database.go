package database

import "context"

type Database interface {
	Read(context.Context, interface{}, string, ...interface{}) error
	Close()
}
