package database

import (
	"context"
	"errors"
	"reflect"

	"github.com/jmoiron/sqlx"

	// Imported for side effects
	_ "github.com/lib/pq"
)

type Postgres struct {
	db *sqlx.DB
}

func NewPostgres(conStr string) (*Postgres, error) {
	db, err := sqlx.Connect("postgres", conStr)

	if err != nil {
		return nil, err
	}

	return &Postgres{
		db: db,
	}, nil
}

func (s *Postgres) Read(ctx context.Context, dest interface{}, query string, args ...interface{}) error {
	if !isPointer(dest) {
		return errors.New("destination should be a pointer")
	}
	if isArrayOrSlice(dest) {
		return s.db.SelectContext(ctx, dest, query, args...)
	}
	return s.db.GetContext(ctx, dest, query, args...)
}

func (s *Postgres) Close() {
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
