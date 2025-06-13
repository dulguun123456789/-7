const animals = [
  "🐭 Хулгана", "🐮 Үхэр", "🐯 Бар", "🐰 Туулай", "🐉 Луу", "🐍 Могой",
  "🐴 Морь", "🐑 Хонь", "🐵 Бич", "🐔 Тахиа", "🐶 Нохой", "🐷 Гахай"
];

const zodiacSigns = [
  { name: "♑ Матар", from: [12, 22], to: [1, 19], trait: "Удирдан чиглүүлэгч, шийдэмгий, санхүүгийн мэдрэмжтэй." },
  { name: "♒ Хумх", from: [1, 20], to: [2, 18], trait: "Бүтээлч, чөлөөт сэтгэлгээтэй, нийгмийн идэвхтэй." },
  { name: "♓ Загас", from: [2, 19], to: [3, 20], trait: "Зөөлөн, энэрэнгүй, уран сэтгэмжтэй, мэдрэмж өндөртэй." },
  { name: "♈ Хонь", from: [3, 21], to: [4, 19], trait: "Эрч хүчтэй, шуурхай, манлайлагч." },
  { name: "♉ Үхэр", from: [4, 20], to: [5, 20], trait: "Тэвчээртэй, үнэнч, найдвартай." },
  { name: "♊ Ихэр", from: [5, 21], to: [6, 20], trait: "Яриа хөөрөөтэй, олон талын сонирхолтой, сэргэлэн." },
  { name: "♋ Мэлхий", from: [6, 21], to: [7, 22], trait: "Мэдрэмжтэй, гэр бүлсэг, хамгаалагч зан чанартай." },
  { name: "♌ Арслан", from: [7, 23], to: [8, 22], trait: "Урам зоригтой, зоримог, манлайлагч." },
  { name: "♍ Охин", from: [8, 23], to: [9, 22], trait: "Нямбай, дүн шинжилгээтэй, логиктой." },
  { name: "♎ Жинлүүр", from: [9, 23], to: [10, 22], trait: "Тэнцвэртэй, шударга, гоо зүйн мэдрэмжтэй." },
  { name: "♏ Хилэнц", from: [10, 23], to: [11, 21], trait: "Гүн гүнзгий, нууцлаг, шийдэмгий." },
  { name: "♐ Нум", from: [11, 22], to: [12, 21], trait: "Адал явдалд дуртай, өөдрөг, философитой." }
];

function getAnimal(year) {
  const baseYear = 2020;
  const index = (year - baseYear) % 12;
  return animals[(index + 12) % 12];
}

function getZodiac(month, day) {
  for (let i = 0; i < zodiacSigns.length; i++) {
    const { name, from, to } = zodiacSigns[i];
    if (
      (month === from[0] && day >= from[1]) ||
      (month === to[0] && day <= to[1])
    ) {
      return zodiacSigns[i];
    }
  }
  return { name: "Орд тодорхойлогдсонгүй", trait: "Мэдээлэл олдсонгүй." };
}

function fromAge() {
  const age = parseInt(document.getElementById("ageInput").value);
  const now = new Date().getFullYear();
  const birthYear = now - age;

  const animal = getAnimal(birthYear);

  const r1 = document.getElementById("ageResult1");
  const r2 = document.getElementById("ageResult2");

  if (!age || age < 0 || age > 120) {
    r1.innerText = "❌ Насны утга буруу байна.";
    r2.innerText = "";
    return;
  }

  r1.innerText = `🎂 Та ${birthYear} онд төрсөн.`;
  r2.innerText = `🐾 Монгол жил: ${animal}`;
}

function fromDate() {
  const year = parseInt(document.getElementById("yearInput").value);
  const month = parseInt(document.getElementById("monthInput").value);
  const day = parseInt(document.getElementById("dayInput").value);

  const r1 = document.getElementById("dateResult1");
  const r2 = document.getElementById("dateResult2");
  const r3 = document.getElementById("dateResult3");
  const r4 = document.getElementById("dateResult4");

  // Жил 1850-аас бага эсвэл одоогийн оноос их бол алдаа заах шалгалт
  const now = new Date().getFullYear();
  if (!year || year < 1850 || year > now || !month || !day || month < 1 || month > 12 || day < 1 || day > 31) {
    r1.innerText = "❌ Та мэдээллээ зөв оруулна уу! (Жил 1850-ээс их, одоогийн оноос бага байх ёстой)";
    r2.innerText = "❌ Өдөр 31-ээс бага байх ";
    r3.innerText = "";
    r4.innerText = "";
    return;
  }

  const age = now - year;
  const animal = getAnimal(year);
  const zodiac = getZodiac(month, day);

  r1.innerText = `🎂 Та ${year} онд төрсөн.`;
  r2.innerText = `📅 Та ${age} настай.`;
  r3.innerText = `🐾 Монгол жил: ${animal}`;
  r4.innerText = `🔯 Зурхайн орд: ${zodiac.name} — ${zodiac.trait}`;
}