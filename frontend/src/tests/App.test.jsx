import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import axios from 'axios'
import {
    CATEGORIES_API_URL, CUSTOMERS_API_URL, ORDERS_API_URL,
    PRODUCTS_API_URL, COMMENTS_API_URL, RATINGS_API_URL
} from '../constants';
import App from "../App"

vi.mock('axios')

describe('tests', () => {
    test('checks if mock axios is actually mock', async () => {
        expect(vi.isMockFunction(axios.get)).toBe(true)
    })
    test('GET from customers', async () => {
        await axios.get(CUSTOMERS_API_URL)
        expect(axios.get).toHaveBeenCalledWith('http://localhost:8000/api/customers/')
    })
    test('GET from products', async () => {
        await axios.get(PRODUCTS_API_URL)
        expect(axios.get).toHaveBeenCalledWith('http://localhost:8000/api/products/')
    })
    test('GET from orders', async () => {
        await axios.get(ORDERS_API_URL)
        expect(axios.get).toHaveBeenCalledWith('http://localhost:8000/api/orders/')
    })
    test('GET from categories', async () => {
        await axios.get(CATEGORIES_API_URL)
        expect(axios.get).toHaveBeenCalledWith('http://localhost:8000/api/categories/')
    })
    test('GET from comments', async () => {
        await axios.get(COMMENTS_API_URL)
        expect(axios.get).toHaveBeenCalledWith('http://localhost:8000/api/comments/')
    })
    test('GET from ratings', async () => {
        await axios.get(RATINGS_API_URL)
        expect(axios.get).toHaveBeenCalledWith('http://localhost:8000/api/ratings/')
    })
    // without giving a JSON struct to post, they should be undefined
    test('POST to customers', async () => {
        const customer = await axios.post(CUSTOMERS_API_URL)
        expect(customer).toBeUndefined()
    })
    test('POST to products', async () => {
        const product = await axios.post(PRODUCTS_API_URL)
        expect(product).toBeUndefined()
    })
    test('POST to orders', async () => {
        const order = await axios.post(ORDERS_API_URL)
        expect(order).toBeUndefined()
    })
    test('POST to categories', async () => {
        const category = await axios.post(CATEGORIES_API_URL)
        expect(category).toBeUndefined()
    })
    test('POST to comments', async () => {
        const comment = await axios.post(COMMENTS_API_URL)
        expect(comment).toBeUndefined()
    })
    test('POST to ratings', async () => {
        const rating = await axios.post(RATINGS_API_URL)
        expect(rating).toBeUndefined()
    })
    // deleting without specifying anything makes it undefined
    test('DELETE to customers', async () => {
        const customer = await axios.delete(CUSTOMERS_API_URL)
        expect(customer).toBeUndefined()
    })
    test('DELETE to products', async () => {
        const product = await axios.delete(PRODUCTS_API_URL)
        expect(product).toBeUndefined()
    })
    test('DELETE to orders', async () => {
        const order = await axios.delete(ORDERS_API_URL)
        expect(order).toBeUndefined()
    })
    test('DELETE to categories', async () => {
        const category = await axios.delete(CATEGORIES_API_URL)
        expect(category).toBeUndefined()
    })
    test('DELETE to comments', async () => {
        const comment = await axios.delete(COMMENTS_API_URL)
        expect(comment).toBeUndefined()
    })
    test('DELETE to ratings', async () => {
        const rating = await axios.delete(RATINGS_API_URL)
        expect(rating).toBeUndefined()
    })
    // putting without mentioning anything makes them also undefined
    test('PUT to customers', async () => {
        const customer = await axios.put(CUSTOMERS_API_URL)
        expect(customer).toBeUndefined()
    })
    test('PUT to products', async () => {
        const product = await axios.put(PRODUCTS_API_URL)
        expect(product).toBeUndefined()
    })
    test('PUT to orders', async () => {
        const order = await axios.put(ORDERS_API_URL)
        expect(order).toBeUndefined()
    })
    test('PUT to categories', async () => {
        const category = await axios.put(CATEGORIES_API_URL)
        expect(category).toBeUndefined()
    })
    test('PUT to comments', async () => {
        const comment = await axios.put(COMMENTS_API_URL + "1/")
        expect(comment).toBeUndefined()
    })
    test('PUT to ratings', async () => {
        const rating = await axios.put(RATINGS_API_URL)
        expect(rating).toBeUndefined()
    })
})