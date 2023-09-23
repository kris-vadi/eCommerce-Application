import { Category, ProductLimit } from '../types/types';

export const catalogQueryParams = new Map();

export const catalogBreadcrumbs = new Map();

export const stateCategories = new Map<string | undefined, Category[]>();

export const productAgeSelectedIds: Set<string> = new Set();

export const productGendersSelectedIds: Set<string> = new Set();

export const productTypesSelectedIds: Set<string> = new Set();

export const productLimit: ProductLimit = {
  limit: 12,
};
