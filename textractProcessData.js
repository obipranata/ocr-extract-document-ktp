module.exports = async block => {
  const data = await block;
  const matchNik = data.match(/[0-9].{15}/);
  const matchNama = data.match(/Nama(.+?)Tempat/);
  const matchTglLahir = data.match(/Lahir\s*:\s*(\S+\s\S+)/);
  const matchAlamat = data.match(/Alamat(.+?)Agama/);
  const matchAgama = data.match(/Agama : (\S+)/);
  const matchStatus = data.match(/Status Perkawinan(.+?)Pekerjaan/);
  const matchPekerjaan = data.match(/Pekerjaan(.+?)Kewarganegaraan/);
  const matchKewarganegaraan = data.match(/Kewarganegaraan(.+?)Berlaku/);

  let status = 'N/A';
  if(matchStatus && matchStatus[0].includes('KAWIN')){
    status = 'KAWIN';
  }

  if(matchStatus && matchStatus[0].includes('BELUM KAWIN')){
    status = 'BELUM KAWIN';
  }

  return {
    'nik' : matchNik ? matchNik[0] : null,
    'nama' : matchNama ? matchNama[1].replace(/:/g, '').trim()  : null,
    'tgl_lahir' : matchTglLahir ? matchTglLahir[1] : null,
    'alamat' : matchAlamat ? matchAlamat[1].replace(/:/g, '').trim() : null,
    'agama' : matchAgama ? matchAgama[1] : null,
    'status_perkawinan' : status,
    'pekerjaan' : matchPekerjaan ? matchPekerjaan[1].replace(/:/g, '').trim() : null,
    'kewarganegaraan' : matchKewarganegaraan ? matchKewarganegaraan[1].replace(/:/g, '').trim() : null,
  };
}