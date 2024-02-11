/**
 * Uses Telefunc to transform queryFn function call into an HTTP API call.
 */

import { queryFn } from './+queryFn';

export const onLoad = queryFn;