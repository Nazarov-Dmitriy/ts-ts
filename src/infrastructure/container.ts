import "reflect-metadata";
import { Container, decorate, injectable } from 'inversify'
import { BookServise } from '../books/books.servise'

export const container = new Container();

decorate(injectable(), BookServise);
container.bind(BookServise).toSelf().inSingletonScope();

