import { fetchHandler, getPostOptions } from "../utils";

//const baseUrl = `api/users/${id}/journal_entries/`;

export const createEntry = async ({ content, date, user_id }) => (
  fetchHandler(baseUrl, getPostOptions({ content, date, user_id }))
);

/*export const getAllEntries = async () => {
  const [journal_entries] = await fetchHandler(baseUrl);
  return journal_entries || [];
};
*/

export const getEntries = async (id) => fetchHandler(`api/users/${id}/journal_entries/`);

// export const updateEntry = async ({ content, date, id }) => (
//   fetchHandler(`${baseUrl}/${id}`, getPatchOptions({ content, date, id }))
// );