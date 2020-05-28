export default{
  getAllUids:(state) => {
      let uids = []
      for(let team of state.teams){
        team.users.forEach(uid=> {
          uids.push(uid)
        });
      }
    let unique_values = [...new Set(uids)];
    return unique_values
  }
}