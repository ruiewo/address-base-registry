import { towns } from './town.js';
import { townPos } from './townPos.js';

main();

function main() {
  const input = document.getElementById('input');
  const zipCode = document.getElementById('zipCode');
  const select = document.getElementById('select');
  const position = document.getElementById('position');
  const iframe = document.querySelector('iframe');

  input.addEventListener('input', (e) => {
    const value = e.target.value;
    const townList = towns.filter((t) => t.fullname.includes(value));

    select.innerHTML = townList
      .map((t) => `<option value="${t.町字id}">${t.fullname}</option>`)
      .join('');
  });

  zipCode.addEventListener('input', (e) => {
    const value = e.target.value;
    const townList = towns.filter((t) => t.郵便番号.startsWith(value));

    select.innerHTML = townList
      .map(
        (t) =>
          `<option value="${t.町字id}" data-id1="${t.全国地方公共団体コード}" data-id2="${t.町字id}">${t.fullname}</option>`,
      )
      .join('');
  });

  select.addEventListener('change', (e) => {
    const option = e.target.selectedOptions[0];
    if (!option) {
      return;
    }

    const 全国地方公共団体コード = option.dataset.id1;
    const 町字id = option.dataset.id2;

    const value = e.target.value;
    const pos = townPos.find(
      (t) =>
        t.全国地方公共団体コード === 全国地方公共団体コード &&
        t.町字id === 町字id,
    );

    const param = pos.代表点_緯度 + ',' + pos.代表点_経度;
    const url = `https://maps.google.co.jp/maps?output=embed&z=13&q=${param}`;

    iframe.src = url;
    position.value = param;
  });
}
