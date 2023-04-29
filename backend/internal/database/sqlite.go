package database

import (
	"context"
	"errors"
	"reflect"

	"github.com/jmoiron/sqlx"

	// Imported for side effects
	_ "github.com/mattn/go-sqlite3"
)

type Sqlite struct {
	db *sqlx.DB
}

func NewSqlite(conStr string) (*Sqlite, error) {
	db, err := sqlx.Connect("sqlite3", conStr)

	if err != nil {
		return nil, err
	}

	return &Sqlite{
		db: db,
	}, nil
}

func (s *Sqlite) Read(ctx context.Context, dest interface{}, query string, args ...interface{}) error {
	if !isPointer(dest) {
		return errors.New("destination should be a pointer")
	}
	if isArrayOrSlice(dest) {
		return s.db.SelectContext(ctx, dest, query, args...)
	}
	return s.db.GetContext(ctx, dest, query, args...)
}

func (s *Sqlite) Close() {
	s.db.Close()
}

func isArrayOrSlice(dest any) bool {
	kind := reflect.Indirect(reflect.ValueOf(dest)).Kind()
	return kind == reflect.Slice || kind == reflect.Array
}

func isPointer(dest any) bool {
	v := reflect.ValueOf(dest)
	return v.Kind() == reflect.Ptr
}
