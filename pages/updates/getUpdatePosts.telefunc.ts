import { getUpdatePosts as getUpdatePostsDB } from './getUpdatePosts.db';

// Telefunc function cannot be referenced on server side, so DB functionality must be defined in its own file
async function getUpdatePosts() {
  return getUpdatePostsDB();
}

export { getUpdatePosts }