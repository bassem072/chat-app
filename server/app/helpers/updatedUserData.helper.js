export const updateUserData = (updateData) => {
  const data = {};

  if (updateData.name) {
    data.name = updateData.name;
  }

  if (updateData.bio) {
    data.bio = updateData.bio;
  }

  if (updateData.gender) {
    data.gender = updateData.gender;
  }

  if (updateData.birthdate) {
    data.birthdate = updateData.birthdate;
  }

  return data;
};