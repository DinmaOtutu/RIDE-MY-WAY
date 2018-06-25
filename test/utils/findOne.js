// function to find first matching object from a list of objects 'datas'

export default function (datas, {
  ...all
}) {
  return datas.find((data) => {
    let found;

    Object.keys(all).forEach((key) => {
      if (data[key] && data[key] === all[key]) {
        found = data;
      }
    });

    return found || false;
  });
}
