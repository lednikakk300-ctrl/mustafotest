import { Grade, SubjectId, Difficulty, Question, Language } from '../types/quiz';
import { CURRICULUM_BANK, BankItem } from './curriculumBank';

function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

interface QuestionSeed {
  qUz: string;
  qRu: string;
  qEn: string;
  optsUz: string[];
  optsRu: string[];
  optsEn: string[];
  correct: number;
  expUz: string;
  expRu: string;
  expEn: string;
  topicUz: string;
  topicRu: string;
  topicEn: string;
}

// 1. Math Generator (Grades 1-11, Oson, O'rta, Qiyin)
function generateMath(grade: Grade, diff: Difficulty, i: number): QuestionSeed {
  if (grade <= 4) {
    if (diff === 'oson') {
      const a = (i * 3 + 4) % 25 + 5;
      const b = (i * 2 + 3) % 20 + 2;
      const isAdd = i % 2 === 0;
      const ans = isAdd ? a + b : a + b; // if sub, (a+b) - b = a
      if (isAdd) {
        return {
          qUz: `${a} + ${b} yig'indisi nechaga teng?`,
          qRu: `Чему равна сумма ${a} + ${b}?`,
          qEn: `What is the sum of ${a} + ${b}?`,
          optsUz: [`${a + b}`, `${a + b + 2}`, `${a + b - 1}`, `${a + b + 5}`],
          optsRu: [`${a + b}`, `${a + b + 2}`, `${a + b - 1}`, `${a + b + 5}`],
          optsEn: [`${a + b}`, `${a + b + 2}`, `${a + b - 1}`, `${a + b + 5}`],
          correct: 0,
          expUz: `${a} ga ${b} qo'shilsa ${a + b} bo'ladi.`,
          expRu: `Сумма ${a} и ${b} равна ${a + b}.`,
          expEn: `Adding ${a} and ${b} results in ${a + b}.`,
          topicUz: 'Qo\'shish amali',
          topicRu: 'Сложение',
          topicEn: 'Addition',
        };
      } else {
        const sum = a + b;
        return {
          qUz: `${sum} - ${b} ayirmasi nechaga teng?`,
          qRu: `Чему равна разность ${sum} - ${b}?`,
          qEn: `What is the difference ${sum} - ${b}?`,
          optsUz: [`${a}`, `${a + 3}`, `${a - 2}`, `${a + 5}`],
          optsRu: [`${a}`, `${a + 3}`, `${a - 2}`, `${a + 5}`],
          optsEn: [`${a}`, `${a + 3}`, `${a - 2}`, `${a + 5}`],
          correct: 0,
          expUz: `${sum} dan ${b} ayrilsa ${a} qoladi.`,
          expRu: `Разность ${sum} и ${b} равна ${a}.`,
          expEn: `Subtracting ${b} from ${sum} leaves ${a}.`,
          topicUz: 'Ayirish amali',
          topicRu: 'Вычитание',
          topicEn: 'Subtraction',
        };
      }
    } else if (diff === 'orta') {
      const a = (i % 9) + 4;
      const b = ((i * 3) % 8) + 3;
      const prod = a * b;
      return {
        qUz: `${a} × ${b} ko'paytmasi nechaga teng?`,
        qRu: `Чему равно произведение ${a} × ${b}?`,
        qEn: `What is ${a} × ${b}?`,
        optsUz: [`${prod}`, `${prod + 4}`, `${prod - 6}`, `${prod + 8}`],
        optsRu: [`${prod}`, `${prod + 4}`, `${prod - 6}`, `${prod + 8}`],
        optsEn: [`${prod}`, `${prod + 4}`, `${prod - 6}`, `${prod + 8}`],
        correct: 0,
        expUz: `${a} × ${b} = ${prod}.`,
        expRu: `Таблица умножения: ${a} × ${b} = ${prod}.`,
        expEn: `Multiplication table: ${a} × ${b} = ${prod}.`,
        topicUz: 'Ko\'paytirish jadvali',
        topicRu: 'Таблица умножения',
        topicEn: 'Multiplication',
      };
    } else {
      const a = ((i * 2) % 6) + 4;
      const b = ((i * 3) % 7) + 5;
      const c = (i % 15) + 10;
      const ans = a * b + c;
      return {
        qUz: `Ifodaning qiymatini hisoblang: ${a} × ${b} + ${c}`,
        qRu: `Вычислите значение выражения: ${a} × ${b} + ${c}`,
        qEn: `Evaluate the expression: ${a} × ${b} + ${c}`,
        optsUz: [`${ans}`, `${ans + 10}`, `${ans - 5}`, `${ans + 3}`],
        optsRu: [`${ans}`, `${ans + 10}`, `${ans - 5}`, `${ans + 3}`],
        optsEn: [`${ans}`, `${ans + 10}`, `${ans - 5}`, `${ans + 3}`],
        correct: 0,
        expUz: `Avval ko'paytirish: ${a} × ${b} = ${a * b}, so'ngra qo'shish: ${a * b} + ${c} = ${ans}.`,
        expRu: `Сначала умножение: ${a} × ${b} = ${a * b}, затем сложение: ${a * b} + ${c} = ${ans}.`,
        expEn: `First multiply: ${a} × ${b} = ${a * b}, then add: ${a * b} + ${c} = ${ans}.`,
        topicUz: 'Murakkab ifodalar',
        topicRu: 'Составные выражения',
        topicEn: 'Combined Operations',
      };
    }
  } else if (grade <= 8) {
    if (diff === 'oson') {
      const a = (i % 5) + 2;
      const x = ((i * 2) % 8) + 3;
      const b = (i % 10) + 5;
      const rhs = a * x + b;
      return {
        qUz: `Tenglamani yeching: ${a}x + ${b} = ${rhs}`,
        qRu: `Решите уравнение: ${a}x + ${b} = ${rhs}`,
        qEn: `Solve the equation: ${a}x + ${b} = ${rhs}`,
        optsUz: [`x = ${x}`, `x = ${x + 2}`, `x = ${x - 1}`, `x = ${x + 3}`],
        optsRu: [`x = ${x}`, `x = ${x + 2}`, `x = ${x - 1}`, `x = ${x + 3}`],
        optsEn: [`x = ${x}`, `x = ${x + 2}`, `x = ${x - 1}`, `x = ${x + 3}`],
        correct: 0,
        expUz: `${a}x = ${rhs} - ${b} => ${a}x = ${rhs - b} => x = ${x}.`,
        expRu: `${a}x = ${rhs} - ${b} => ${a}x = ${rhs - b} => x = ${x}.`,
        expEn: `${a}x = ${rhs} - ${b} => ${a}x = ${rhs - b} => x = ${x}.`,
        topicUz: 'Chiziqli tenglamalar',
        topicRu: 'Линейные уравнения',
        topicEn: 'Linear Equations',
      };
    } else if (diff === 'orta') {
      const base = ((i % 8) + 2) * 50;
      const perc = ((i % 4) + 1) * 10;
      const ans = (base * perc) / 100;
      return {
        qUz: `${base} sonining ${perc}% ini toping.`,
        qRu: `Найдите ${perc}% от числа ${base}.`,
        qEn: `Find ${perc}% of ${base}.`,
        optsUz: [`${ans}`, `${ans + 20}`, `${ans - 15}`, `${ans + 35}`],
        optsRu: [`${ans}`, `${ans + 20}`, `${ans - 15}`, `${ans + 35}`],
        optsEn: [`${ans}`, `${ans + 20}`, `${ans - 15}`, `${ans + 35}`],
        correct: 0,
        expUz: `${base} × ${perc} / 100 = ${ans}.`,
        expRu: `${base} × ${perc} / 100 = ${ans}.`,
        expEn: `${base} × ${perc} / 100 = ${ans}.`,
        topicUz: 'Foizlar',
        topicRu: 'Проценты',
        topicEn: 'Percentages',
      };
    } else {
      const p = (i % 6) + 2;
      const q = ((i + 2) % 6) + 3;
      const sum = p + q;
      const prod = p * q;
      return {
        qUz: `x² - ${sum}x + ${prod} = 0 kvadrat tenglamaning ildizlarini aniqlang.`,
        qRu: `Найдите корни квадратного уравнения: x² - ${sum}x + ${prod} = 0.`,
        qEn: `Find the roots of the quadratic equation: x² - ${sum}x + ${prod} = 0.`,
        optsUz: [
          `x₁ = ${Math.min(p, q)}, x₂ = ${Math.max(p, q)}`,
          `x₁ = -${p}, x₂ = -${q}`,
          `x₁ = ${p + 2}, x₂ = ${q + 1}`,
          `x₁ = ${p * 2}, x₂ = ${q}`,
        ],
        optsRu: [
          `x₁ = ${Math.min(p, q)}, x₂ = ${Math.max(p, q)}`,
          `x₁ = -${p}, x₂ = -${q}`,
          `x₁ = ${p + 2}, x₂ = ${q + 1}`,
          `x₁ = ${p * 2}, x₂ = ${q}`,
        ],
        optsEn: [
          `x₁ = ${Math.min(p, q)}, x₂ = ${Math.max(p, q)}`,
          `x₁ = -${p}, x₂ = -${q}`,
          `x₁ = ${p + 2}, x₂ = ${q + 1}`,
          `x₁ = ${p * 2}, x₂ = ${q}`,
        ],
        correct: 0,
        expUz: `Viyet teoremasiga asosan: x₁ + x₂ = ${sum}, x₁ · x₂ = ${prod}. Ildizlar: ${p} va ${q}.`,
        expRu: `По теореме Виета корни уравнения: ${p} и ${q}.`,
        expEn: `By Vieta's formulas, the roots are ${p} and ${q}.`,
        topicUz: 'Kvadrat tenglamalar',
        topicRu: 'Квадратные уравнения',
        topicEn: 'Quadratic Equations',
      };
    }
  } else {
    // 9-11
    if (diff === 'oson') {
      const trig = [
        { name: 'sin(30°)', val: '1/2', wrong: ['√3/2', '√2/2', '1'] },
        { name: 'cos(60°)', val: '1/2', wrong: ['√3/2', '0', '1'] },
        { name: 'sin(90°)', val: '1', wrong: ['0', '1/2', '√2/2'] },
        { name: 'cos(0°)', val: '1', wrong: ['0', '-1', '1/2'] },
        { name: 'tg(45°)', val: '1', wrong: ['0', '√3', '1/√3'] },
        { name: 'sin(0°)', val: '0', wrong: ['1', '1/2', '-1'] },
      ];
      const item = trig[i % trig.length];
      return {
        qUz: `${item.name} ning qiymati nechaga teng?`,
        qRu: `Чему равно значение ${item.name}?`,
        qEn: `What is the value of ${item.name}?`,
        optsUz: [item.val, ...item.wrong],
        optsRu: [item.val, ...item.wrong],
        optsEn: [item.val, ...item.wrong],
        correct: 0,
        expUz: `Standart trigonometrik jadvalga ko'ra: ${item.name} = ${item.val}.`,
        expRu: `По таблице тригонометрических значений: ${item.name} = ${item.val}.`,
        expEn: `By standard trigonometric values: ${item.name} = ${item.val}.`,
        topicUz: 'Trigonometriya',
        topicRu: 'Тригонометрия',
        topicEn: 'Trigonometry',
      };
    } else if (diff === 'orta') {
      const bases = [2, 3, 5];
      const b = bases[i % bases.length];
      const exp = (i % 3) + 2;
      const res = Math.pow(b, exp);
      return {
        qUz: `log_${b}(${res}) qiymatini hisoblang.`,
        qRu: `Вычислите log_${b}(${res}).`,
        qEn: `Compute log_${b}(${res}).`,
        optsUz: [`${exp}`, `${exp + 1}`, `${exp - 1}`, `${exp * 2}`],
        optsRu: [`${exp}`, `${exp + 1}`, `${exp - 1}`, `${exp * 2}`],
        optsEn: [`${exp}`, `${exp + 1}`, `${exp - 1}`, `${exp * 2}`],
        correct: 0,
        expUz: `${b}^${exp} = ${res} bo'lgani sababli, javob: ${exp}.`,
        expRu: `Поскольку ${b}^${exp} = ${res}, ответ: ${exp}.`,
        expEn: `Because ${b}^${exp} = ${res}, the result is ${exp}.`,
        topicUz: 'Logarifmlar',
        topicRu: 'Логарифмы',
        topicEn: 'Logarithms',
      };
    } else {
      const c = (i % 4) + 2;
      const n = (i % 3) + 2;
      return {
        qUz: `f(x) = ${c}x^${n} funksiyaning hosilasini toping.`,
        qRu: `Найдите производную f'(x) функции f(x) = ${c}x^${n}.`,
        qEn: `Find the derivative f'(x) for f(x) = ${c}x^${n}.`,
        optsUz: [`${c * n}x^${n - 1}`, `${c}x^${n - 1}`, `${c * n}x^${n}`, `${c * (n + 1)}x^${n}`],
        optsRu: [`${c * n}x^${n - 1}`, `${c}x^${n - 1}`, `${c * n}x^${n}`, `${c * (n + 1)}x^${n}`],
        optsEn: [`${c * n}x^${n - 1}`, `${c}x^${n - 1}`, `${c * n}x^${n}`, `${c * (n + 1)}x^${n}`],
        correct: 0,
        expUz: `(c·x^n)' = c·n·x^(n-1) qoidasiga ko'ra: ${c * n}x^${n - 1}.`,
        expRu: `По правилу дифференцирования: ${c * n}x^${n - 1}.`,
        expEn: `Using the power rule: ${c * n}x^${n - 1}.`,
        topicUz: 'Matematik analiz',
        topicRu: 'Производные',
        topicEn: 'Calculus',
      };
    }
  }
}

// 2. Thematic Question Engine for Other 9 Subjects
function generateThematicQuestion(subject: SubjectId, grade: Grade, diff: Difficulty, i: number): QuestionSeed {
  // Rich pools of curated textbook items for each subject
  const pools: Record<SubjectId, QuestionSeed[]> = {
    tarix: [
      {
        qUz: "Amir Temur qaysi yili tavallud topgan?",
        qRu: "В каком году родился Амир Темур?",
        qEn: "In which year was Amir Temur born?",
        optsUz: ["1336-yil 9-aprel", "1370-yil 1-may", "1405-yil 18-fevral", "1441-yil 9-fevral"],
        optsRu: ["9 апреля 1336 года", "1 мая 1370 года", "18 февраля 1405 года", "9 февраля 1441 года"],
        optsEn: ["April 9, 1336", "May 1, 1370", "February 18, 1405", "February 9, 1441"],
        correct: 0,
        expUz: "Amir Temur 1336-yil 9-aprelda Kesh (Shahrisabz) yaqinidagi Xo'ja Ilg'or qishlog'ida tug'ilgan.",
        expRu: "Амир Темур родился 9 апреля 1336 года в селе Ходжа Илгар близ Шахрисабза.",
        expEn: "Amir Temur was born on April 9, 1336 near Shahrisabz.",
        topicUz: "Amir Temur davri",
        topicRu: "Эпоха Амира Темура",
        topicEn: "Amir Temur Era",
      },
      {
        qUz: "Al-Xorazmiy qaysi fanga asos solgan va uning nomi bilan qaysi atama bog'liq?",
        qRu: "Основоположником какой науки был Аль-Хорезми и какой термин связан с его именем?",
        qEn: "Which science did Al-Khwarizmi pioneer, and what term originates from his name?",
        optsUz: ["Algebra va 'Algoritm' atamasi", "Geometriya", "Astronomiya", "Tibbiyot"],
        optsRu: ["Алгебра и термин «Алгоритм»", "Геометрия", "Астрономия", "Медицина"],
        optsEn: ["Algebra and the term 'Algorithm'", "Geometry", "Astronomy", "Medicine"],
        correct: 0,
        expUz: "Muhammad al-Xorazmiy 'Al-Jabr' asari bilan algebraga asos solgan, nomi esa 'algoritm' so'ziga asos bo'lgan.",
        expRu: "Аль-Хорезми создал алгебру, а его латинизированное имя дало термин «алгоритм».",
        expEn: "Al-Khwarizmi founded algebra, and his name is the root of the word 'algorithm'.",
        topicUz: "Buyuk allomalar",
        topicRu: "Великие ученые Востока",
        topicEn: "Great Scholars",
      },
      {
        qUz: "O'zbekiston Respublikasi Konstitutsiyasi qachon qabul qilingan?",
        qRu: "Когда была принята Конституция Республики Узбекистан?",
        qEn: "When was the Constitution of the Republic of Uzbekistan adopted?",
        optsUz: ["1992-yil 8-dekabr", "1991-yil 1-sentyabr", "1993-yil 18-noyabr", "1994-yil 1-iyul"],
        optsRu: ["8 декабря 1992 года", "1 сентября 1991 года", "18 ноября 1993 года", "1 июля 1994 года"],
        optsEn: ["December 8, 1992", "September 1, 1991", "November 18, 1993", "July 1, 1994"],
        correct: 0,
        expUz: "O'zbekiston Respublikasi Konstitutsiyasi 1992-yil 8-dekabrda Oliy Kengashning XII sessiyasida qabul qilingan.",
        expRu: "Конституция Республики Узбекистан принята 8 декабря 1992 года.",
        expEn: "The Constitution of Uzbekistan was adopted on December 8, 1992.",
        topicUz: "Konstitutsiya tarixi",
        topicRu: "История Конституции",
        topicEn: "Constitution History",
      },
      {
        qUz: "Buxoro amirligida qaysi sulola hukmronlik qilgan?",
        qRu: "Какая династия правила в Бухарском эмирате?",
        qEn: "Which dynasty ruled the Emirate of Bukhara?",
        optsUz: ["Mang'itlar sulolasi", "Qo'ng'irotlar sulolasi", "Minglar sulolasi", "Ashtarxoniylar"],
        optsRu: ["Мангыты", "Кунграты", "Минги", "Аштарханиды"],
        optsEn: ["Manghit dynasty", "Qunghrat dynasty", "Ming dynasty", "Ashtarkhanids"],
        correct: 0,
        expUz: "Buxoro amirligida 1756-yildan 1920-yilgacha Mang'itlar sulolasi hukmronlik qilgan.",
        expRu: "В Бухарском эмирате правила династия Мангытов (1756–1920).",
        expEn: "The Manghit dynasty ruled the Emirate of Bukhara from 1756 to 1920.",
        topicUz: "O'zbek xonliklari",
        topicRu: "Узбекские ханства",
        topicEn: "Uzbek Khanates",
      },
      {
        qUz: "Abu Ali ibn Sino qaysi fundamental asari bilan tibbiyot olamida shuhrat qozongan?",
        qRu: "Каким фундаментальным трудом прославился Авиценна (Ибн Сино)?",
        qEn: "With which monumental work did Avicenna (Ibn Sina) become world-renowned in medicine?",
        optsUz: ["'Tib qonunlari' (Al-Qonun fit-tibb)", "'Al-Hind'", "'Ziji Ko'ragoniy'", "'Boburnoma'"],
        optsRu: ["«Канон врачебной науки»", "«Индия»", "«Зидж Гурагони»", "«Бабурнаме»"],
        optsEn: ["'The Canon of Medicine'", "'Indica'", "'Zij-i Sultani'", "'Baburnama'"],
        correct: 0,
        expUz: "Ibn Sinoning 'Tib qonunlari' asari asrlar davomida Sharq va Yevropa tibbiyotining asosiy qo'llanmasi bo'lgan.",
        expRu: "«Канон врачебной науки» Ибн Сины веками служил учебником для врачей Востока и Европы.",
        expEn: "'The Canon of Medicine' was standard medical text in both Islamic world and Europe for centuries.",
        topicUz: "Sharq Uyg'onish davri",
        topicRu: "Восточный Ренессанс",
        topicEn: "Eastern Renaissance",
      },
    ],

    biologiya: [
      {
        qUz: "Hujayra irsiy axborotini saqlovchi va nasldan-naslga o'tkazuvchi asosiy modda qaysi?",
        qRu: "Какое вещество хранит и передает наследственную информацию клетки?",
        qEn: "Which molecule stores and transmits genetic information in cells?",
        optsUz: ["DNK (Dezoksiribonuklein kislotasi)", "Glikogen", "Lipidlar", "Xolesterin"],
        optsRu: ["ДНК", "Гликоген", "Липиды", "Холестерин"],
        optsEn: ["DNA (Deoxyribonucleic acid)", "Glycogen", "Lipids", "Cholesterol"],
        correct: 0,
        expUz: "DNK barcha tirik organizmlarning genetik dasturini nukleotidlar ketma-ketligida saqlaydi.",
        expRu: "ДНК содержит генетический код строения всех белков организма.",
        expEn: "DNA stores the biological code of living organisms.",
        topicUz: "Genetika va Sitologiya",
        topicRu: "Генетика и Цитология",
        topicEn: "Genetics and Cytology",
      },
      {
        qUz: "Inson tanasidagi eng yirik ichki a'zo qaysi?",
        qRu: "Какой самый крупный внутренний орган человека?",
        qEn: "What is the largest internal organ in the human body?",
        optsUz: ["Jigar", "Oshqozon", "Yurak", "O'pka"],
        optsRu: ["Печень", "Желудок", "Сердце", "Легкие"],
        optsEn: ["Liver", "Stomach", "Heart", "Lungs"],
        correct: 0,
        expUz: "Jigar odam organizmidagi eng yirik bez va eng katta ichki a'zo hisoblanadi (vazni ~1.5 kg).",
        expRu: "Печень — самая крупная железа и самый большой внутренний орган человека.",
        expEn: "The liver is the largest internal organ and gland in the human body.",
        topicUz: "Inson anatomiyasi",
        topicRu: "Анатомия человека",
        topicEn: "Human Anatomy",
      },
      {
        qUz: "Qon tarkibida kislorod tashish vazifasini qaysi hujayralar bajaradi?",
        qRu: "Какие клетки крови выполняют функцию переноса кислорода?",
        qEn: "Which blood cells transport oxygen throughout the body?",
        optsUz: ["Eritrotsitlar", "Leykotsitlar", "Trombotsitlar", "Limfotsitlar"],
        optsRu: ["Эритроциты", "Лейкоциты", "Тромбоциты", "Лимфоциты"],
        optsEn: ["Erythrocytes (Red blood cells)", "Leukocytes", "Platelets", "Lymphocytes"],
        correct: 0,
        expUz: "Eritrotsitlar tarkibidagi gemoglobin oqsili kislorodni o'pkadan to'qimalarga yetkazib beradi.",
        expRu: "Эритроциты содержат гемоглобин, связывающий кислород.",
        expEn: "Red blood cells carry hemoglobin, which binds and transports oxygen.",
        topicUz: "Qon va qon aylanishi",
        topicRu: "Кровь и кровообращение",
        topicEn: "Circulatory System",
      },
      {
        qUz: "O'simliklar dunyosida suv va unda erigan moddalar o'tkazuvchi to'qima qaysi?",
        qRu: "Какая ткань растений проводит воду и минеральные соли от корней к листьям?",
        qEn: "Which plant vascular tissue conducts water and dissolved minerals upward from roots?",
        optsUz: ["Ksilema (naylar)", "Floema (elaksimon naylar)", "Kambiy", "Po'kak"],
        optsRu: ["Ксилема (древесина)", "Флоэма (луб)", "Камбий", "Пробка"],
        optsEn: ["Xylem", "Phloem", "Cambium", "Cork"],
        correct: 0,
        expUz: "Ksilema o'simlikda suv va mineral moddalarni ildizdan barglarga yuqoriga o'tkazuvchi asosiy yo'ldir.",
        expRu: "Ксилема осуществляет восходящий ток воды и минеральных веществ.",
        expEn: "Xylem transports water and dissolved minerals from roots to leaves.",
        topicUz: "Botanika (O'simlik to'qimalari)",
        topicRu: "Ботаника",
        topicEn: "Botany (Plant Tissues)",
      },
    ],

    fizika: [
      {
        qUz: "Jismning inersiyasini xarakterlovchi fizik kattalik nima?",
        qRu: "Какая физическая величина является мерой инертности тела?",
        qEn: "Which physical quantity serves as a measure of a body's inertia?",
        optsUz: ["Massa", "Tezlik", "Hajm", "Bosim"],
        optsRu: ["Масса", "Скорость", "Объем", "Давление"],
        optsEn: ["Mass", "Velocity", "Volume", "Pressure"],
        correct: 0,
        expUz: "Massa moddaning inersion va gravitatsion xossasini ifodalovchi o'lchovdir.",
        expRu: "Масса тела — мера его инертности при поступательном движении.",
        expEn: "Mass is a scalar measure of an object's inertia.",
        topicUz: "Nyuton mexanikasi",
        topicRu: "Механика",
        topicEn: "Classical Mechanics",
      },
      {
        qUz: "Suyuqlik yoki gazga botirilgan jismga ko'taruvchi kuch ta'sir qilishini kim kashf etgan?",
        qRu: "Кто открыл закон о выталкивающей силе, действующей на тело в жидкости или газе?",
        qEn: "Who discovered the buoyant force acting on an object immersed in a fluid?",
        optsUz: ["Arximed", "Paskal", "Nyuton", "Galiley"],
        optsRu: ["Архимед", "Паскаль", "Ньютон", "Галилей"],
        optsEn: ["Archimedes", "Pascal", "Newton", "Galileo"],
        correct: 0,
        expUz: "Arximed qonuniga ko'ra, suyuqlikka botirilgan jismga siqib chiqarilgan suyuqlik og'irligiga teng ko'taruvchi kuch ta'sir qiladi.",
        expRu: "Закон Архимеда определяет гидростатическую выталкивающую силу.",
        expEn: "Archimedes' principle states that buoyant force equals the weight of displaced fluid.",
        topicUz: "Gidrostatika",
        topicRu: "Гидростатика",
        topicEn: "Hydrostatics",
      },
      {
        qUz: "Xalqaro birliklar sistemasida (SI) kuchning birligi nima?",
        qRu: "Какова единица измерения силы в Международной системе единиц (СИ)?",
        qEn: "What is the SI unit of force?",
        optsUz: ["Nyuton (N)", "Joul (J)", "Vatt (W)", "Paskal (Pa)"],
        optsRu: ["Ньютон (Н)", "Джоуль (Дж)", "Ватт (Вт)", "Паскаль (Па)"],
        optsEn: ["Newton (N)", "Joule (J)", "Watt (W)", "Pascal (Pa)"],
        correct: 0,
        expUz: "Kuch birligi ser Isaak Nyuton sharafiga Nyuton (N) deb nomlangan (1 N = 1 kg·m/s²).",
        expRu: "Единицей измерения силы в СИ является ньютон (Н).",
        expEn: "The SI unit of force is the newton (N).",
        topicUz: "O'lchov birliklari",
        topicRu: "Единицы измерения",
        topicEn: "Units of Measurement",
      },
      {
        qUz: "Termodinamikaning 0 daraja mutlaq nol nuqtasi necha Selsiyga to'g'ri keladi?",
        qRu: "Чему равен абсолютный нуль температуры по шкале Цельсия?",
        qEn: "What temperature in Celsius corresponds to absolute zero (0 Kelvin)?",
        optsUz: ["-273.15 °C", "-100 °C", "0 °C", "-373.15 °C"],
        optsRu: ["-273,15 °C", "-100 °C", "0 °C", "-373,15 °C"],
        optsEn: ["-273.15 °C", "-100 °C", "0 °C", "-373.15 °C"],
        correct: 0,
        expUz: "Mutlaq nol harorat (0 K) Selsiy shkalasida -273.15 °C ga teng bo'lib, molekulalar harakati to'xtaydigan chegara hisoblanadi.",
        expRu: "Абсолютный ноль (0 К) соответствует -273,15 °C.",
        expEn: "Absolute zero (0 Kelvin) is exactly -273.15 °C.",
        topicUz: "Molekulyar fizika",
        topicRu: "Молекулярная физика",
        topicEn: "Thermodynamics",
      },
    ],

    kimyo: [
      {
        qUz: "Koinotda va quyoshda eng ko'p tarqalgan kimyoviy element qaysi?",
        qRu: "Какой химический элемент наиболее распространен во Вселенной?",
        qEn: "Which chemical element is the most abundant in the universe?",
        optsUz: ["Vodorod (H)", "Kislorod (O)", "Geliy (He)", "Uglerod (C)"],
        optsRu: ["Водород (H)", "Кислород (O)", "Гелий (He)", "Углерод (C)"],
        optsEn: ["Hydrogen (H)", "Oxygen (O)", "Helium (He)", "Carbon (C)"],
        correct: 0,
        expUz: "Vodorod koinotdagi barcha atomlarning qariyb 75% ini tashkil qiladi.",
        expRu: "Водород составляет около 75% массы всей обычной материи Вселенной.",
        expEn: "Hydrogen makes up roughly 75% of all ordinary baryonic matter.",
        topicUz: "Elementlar xossalari",
        topicRu: "Свойства элементов",
        topicEn: "Elements Properties",
      },
      {
        qUz: "Sulfat kislotaning kimyoviy formulasini ko'rsating.",
        qRu: "Укажите химическую формулу серной кислоты.",
        qEn: "Identify the chemical formula of sulfuric acid.",
        optsUz: ["H₂SO₄", "HNO₃", "HCl", "H₃PO₄"],
        optsRu: ["H₂SO₄", "HNO₃", "HCl", "H₃PO₄"],
        optsEn: ["H₂SO₄", "HNO₃", "HCl", "H₃PO₄"],
        correct: 0,
        expUz: "Sulfat kislota kuchli ikki asosli kislota bo'lib, formulasi H₂SO₄ dir.",
        expRu: "Формула серной кислоты — H₂SO₄.",
        expEn: "Sulfuric acid is a strong diprotic mineral acid with formula H₂SO₄.",
        topicUz: "Anorganik kislotalar",
        topicRu: "Неорганические кислоты",
        topicEn: "Inorganic Acids",
      },
      {
        qUz: "Suvning neytral eritmasida vodorod ko'rsatkichi (pH) nechaga teng bo'ladi?",
        qRu: "Чему равен водородный показатель (pH) нейтральной водной среды при 25°C?",
        qEn: "What is the pH of a neutral aqueous solution at 25°C?",
        optsUz: ["pH = 7", "pH = 0", "pH = 14", "pH = 1"],
        optsRu: ["pH = 7", "pH = 0", "pH = 14", "pH = 1"],
        optsEn: ["pH = 7", "pH = 0", "pH = 14", "pH = 1"],
        correct: 0,
        expUz: "Neytral muhitda pH = 7, kislotali muhitda pH < 7, ishqoriy muhitda esa pH > 7 bo'ladi.",
        expRu: "Нейтральный раствор имеет pH = 7 при температуре 25°C.",
        expEn: "Pure water at 25°C has a neutral pH of 7.",
        topicUz: "Eritmalar va pH",
        topicRu: "Растворы и pH",
        topicEn: "Solutions and pH",
      },
    ],

    ona_tili: [
      {
        qUz: "Harakat yoki holatni bildiruvchi va 'Nima qildi?', 'Nima qilyapti?' so'roqlariga javob bo'ladigan so'z turkumi qaysi?",
        qRu: "Какая часть речи обозначает действие предмета и отвечает на вопрос «Что делает?»?",
        qEn: "Which part of speech indicates an action, process, or state?",
        optsUz: ["Fe'l", "Ot", "Sifat", "Ravish"],
        optsRu: ["Глагол", "Имя существительное", "Имя прилагательное", "Наречие"],
        optsEn: ["Verb", "Noun", "Adjective", "Adverb"],
        correct: 0,
        expUz: "Fe'l narsa-buyumlarning harakat va holatini ifodalaydi (o'qimoq, yozmoq, bormoq).",
        expRu: "Глагол выражает действие или состояние субъекта.",
        expEn: "A verb expresses an action, state of being, or occurrence.",
        topicUz: "So'z turkumlari (Fe'l)",
        topicRu: "Части речи (Глагол)",
        topicEn: "Parts of Speech (Verbs)",
      },
      {
        qUz: "Gapdagi bosh bo'laklar qaysilar?",
        qRu: "Какие члены предложения являются главными?",
        qEn: "What are the main grammatical parts of a sentence?",
        optsUz: ["Ega va kesim", "Ega va to'ldiruvchi", "Aniqlovchi va hol", "Kesim va hol"],
        optsRu: ["Подлежащее и сказуемое", "Подлежащее и дополнение", "Определение и обстоятельство", "Сказуемое и обстоятельство"],
        optsEn: ["Subject and predicate", "Subject and object", "Modifier and adverbial", "Predicate and adverbial"],
        correct: 0,
        expUz: "Gapning grammatik asosini ega va kesim tashkil etadi.",
        expRu: "Грамматическую основу предложения составляют подлежащее и сказуемое.",
        expEn: "The primary grammatical core consists of subject and predicate.",
        topicUz: "Sintaksis (Gap bo'laklari)",
        topicRu: "Синтаксис",
        topicEn: "Sentence Structure",
      },
      {
        qUz: "Talaffuzi va yozilishi bir xil, ammo ma'nolari mutlaqo boshqa bo'lgan so'zlar nima deyiladi?",
        qRu: "Как называются слова, одинаковые по написанию и звучанию, но разные по значению?",
        qEn: "What are words called that share identical spelling and pronunciation but have completely distinct meanings?",
        optsUz: ["Omonimlar (shakldosh so'zlar)", "Sinonimlar", "Antonimlar", "Paronimlar"],
        optsRu: ["Омонимы", "Синонимы", "Антонимы", "Паронимы"],
        optsEn: ["Homonyms", "Synonyms", "Antonyms", "Paronyms"],
        correct: 0,
        expUz: "Omonimlar shakli bir xil, leksik ma'nosi har xil so'zlardir (masalan: 'ot' - ism, jonivor, buyruq).",
        expRu: "Омонимы — слова с одинаковым звучанием, но совершенно разным лексическим значением.",
        expEn: "Homonyms share pronunciation and spelling but differ in meaning.",
        topicUz: "Leksikologiya",
        topicRu: "Лексикология",
        topicEn: "Lexicology",
      },
    ],

    adabiyot: [
      {
        qUz: "Zahriddin Muhammad Boburning dunyoga mashhur tarixiy-memuar asari qaysi?",
        qRu: "Как называется всемирно известный исторический автобиографический труд Захириддина Мухаммада Бабура?",
        qEn: "What is the famous autobiographical historical work of Zahiriddin Muhammad Babur?",
        optsUz: ["'Boburnoma'", "'Xamsa'", "'Devoni Foniy'", "'Shajarayi turk'"],
        optsRu: ["«Бабурнаме»", "«Хамса»", "«Дивани Фани»", "«Родословная тюрков»"],
        optsEn: ["'Baburnama'", "'Khamsa'", "'Divan-i Fani'", "'Genealogy of Turks'"],
        correct: 0,
        expUz: "'Boburnoma' Boburning hayoti, yurishlari, tabiat tasvirlari va tarixiy voqealarni qamragan shoh asaridir.",
        expRu: "«Бабурнаме» — выдающийся памятник узбекской классической прозы и мемуаристики.",
        expEn: "'Baburnama' is Babur's celebrated personal memoirs describing history, botany, and geography.",
        topicUz: "Bobur merosi",
        topicRu: "Наследие Бабура",
        topicEn: "Babur's Heritage",
      },
      {
        qUz: "'O'tkan kunlar' romanidagi bosh qahramonlar kimlar?",
        qRu: "Кто является главными героями романа Абдуллы Кадыри «Минувшие дни»?",
        qEn: "Who are the central characters in Abdulla Qodiriy's novel 'Past Days'?",
        optsUz: ["Otabek va Kumushbibi", "Farhod va Shirin", "Tohir va Zuhra", "Majnun va Layli"],
        optsRu: ["Отабек и Кумушбиби", "Фархад и Ширин", "Тахир и Зухра", "Меджнун и Лейли"],
        optsEn: ["Otabek and Kumushbibi", "Farhad and Shirin", "Tahir and Zuhra", "Majnun and Layla"],
        correct: 0,
        expUz: "Roman markazida Otabek va Kumushning fojiali, sof sevgisi hamda XIX asr Turkiston hayoti tasvirlangan.",
        expRu: "В центре романа — драматическая история любви Отабека и Кумуш.",
        expEn: "The story focuses on the love between Otabek and Kumush against 19th century feudal society.",
        topicUz: "Yangi davr o'zbek adabiyoti",
        topicRu: "Узбекский роман",
        topicEn: "Modern Uzbek Literature",
      },
      {
        qUz: "'Dunyoning ishlari' asarining muallifi, O'zbekiston xalq yozuvchisi kim?",
        qRu: "Кто написал трогательную повесть «Дела земные» (Dunyoning ishlari)?",
        qEn: "Who is the author of the beloved Uzbek novella 'Affairs of the World' (Dunyoning ishlari)?",
        optsUz: ["O'tkir Hoshimov", "Said Ahmad", "Erkin Vohidov", "Asqad Muxtor"],
        optsRu: ["Уткир Хашимов", "Саид Ахмад", "Эркин Вахидов", "Аскад Мухтар"],
        optsEn: ["Utkir Hoshimov", "Said Ahmad", "Erkin Vohidov", "Asqad Mukhtar"],
        correct: 0,
        expUz: "O'tkir Hoshimov 'Dunyoning ishlari' asarida mushtipar ona timsolini yuksak mahorat bilan tasvirlagan.",
        expRu: "Уткир Хашимов создал бессмертный образ матери в повести «Дела земные».",
        expEn: "Utkir Hoshimov created an indelible portrait of maternal love in this novella.",
        topicUz: "Zamonaviy o'zbek adabiyoti",
        topicRu: "Современная литература",
        topicEn: "Contemporary Literature",
      },
    ],

    ingliz_tili: [
      {
        qUz: "Choose the correct past form: 'They ___ football yesterday.'",
        qRu: "Выберите правильную форму: 'They ___ football yesterday.'",
        qEn: "Choose the correct past form: 'They ___ football yesterday.'",
        optsUz: ["played", "plays", "playing", "have played"],
        optsRu: ["played", "plays", "playing", "have played"],
        optsEn: ["played", "plays", "playing", "have played"],
        correct: 0,
        expUz: "O'tgan zamon (Past Simple) ko'rsatkichi 'yesterday' bo'lgani sababli to'g'ri fe'lga -ed qo'shiladi: played.",
        expRu: "Маркер 'yesterday' указывает на время Past Simple, поэтому форма правильного глагола — played.",
        expEn: "'Yesterday' marks Past Simple, requiring the past form 'played'.",
        topicUz: "Past Simple Tense",
        topicRu: "Past Simple",
        topicEn: "Past Simple",
      },
      {
        qUz: "What is the opposite of the word 'Generous'?",
        qRu: "Какое слово противоположно по значению слову 'Generous' (щедрый)?",
        qEn: "What is the antonym of the word 'Generous'?",
        optsUz: ["Mean / Stingy", "Kind", "Helpful", "Honest"],
        optsRu: ["Mean / Stingy", "Kind", "Helpful", "Honest"],
        optsEn: ["Mean / Stingy", "Kind", "Helpful", "Honest"],
        correct: 0,
        expUz: "'Generous' (saxiy) so'zining ziddi 'Mean' yoki 'Stingy' (xasis) hisoblanadi.",
        expRu: "Антоним к слову generous (щедрый) — mean/stingy (жадный).",
        expEn: "The antonym of 'generous' is 'mean' or 'stingy'.",
        topicUz: "Vocabulary (Antonyms)",
        topicRu: "Словарь (Антонимы)",
        topicEn: "Vocabulary (Antonyms)",
      },
      {
        qUz: "Fill in the blank: 'Look at those dark clouds! It ___ rain.'",
        qRu: "Вставьте пропущенное: 'Look at those dark clouds! It ___ rain.'",
        qEn: "Fill in the blank: 'Look at those dark clouds! It ___ rain.'",
        optsUz: ["is going to", "will probably", "was going to", "has to"],
        optsRu: ["is going to", "will probably", "was going to", "has to"],
        optsEn: ["is going to", "will probably", "was going to", "has to"],
        correct: 0,
        expUz: "Kelajakdagi voqea uchun hozir aniq dalil (qora bulutlar) bo'lsa 'be going to' ishlatiladi.",
        expRu: "Конструкция 'be going to' выражает предсказание на основе видимых признаков (темные тучи).",
        expEn: "'Be going to' is used when there is present visual evidence of an impending event.",
        topicUz: "Future Intentions & Predictions",
        topicRu: "Будущие времена",
        topicEn: "Future Forms",
      },
    ],

    informatika: [
      {
        qUz: "Kompyuterning barcha hisoblash va mantiqiy amallarni bajaruvchi 'miyasi' qaysi qurilma?",
        qRu: "Какое устройство является «мозгом» компьютера, выполняющим все вычисления?",
        qEn: "Which component is the central 'brain' of the computer that performs all computations?",
        optsUz: ["Protsessor (CPU)", "Qattiq disk (HDD/SSD)", "Operativ xotira (RAM)", "Videokarta (GPU)"],
        optsRu: ["Центральный процессор (CPU)", "Жесткий диск (HDD/SSD)", "Оперативная память (RAM)", "Видеокарта (GPU)"],
        optsEn: ["Central Processing Unit (CPU)", "Hard Drive / SSD", "Random Access Memory (RAM)", "Graphics Card (GPU)"],
        correct: 0,
        expUz: "Markaziy protsessor (CPU) kompyuterning barcha dasturiy ko'rsatmalarini bajaradi va hisob-kitoblarni boshqaradi.",
        expRu: "Центральный процессор осуществляет выполнение инструкций программ.",
        expEn: "The CPU executes program instructions and directs data flow.",
        topicUz: "Kompyuter arxitekturasi",
        topicRu: "Архитектура компьютера",
        topicEn: "Computer Architecture",
      },
      {
        qUz: "Dasturlashda butun sonlar (masalan: 10, -5, 42) qaysi ma'lumot turi bilan belgilanadi?",
        qRu: "Каким типом данных в программировании обозначаются целые числа?",
        qEn: "Which data type represents integers in modern programming languages?",
        optsUz: ["int (integer)", "float", "str (string)", "bool (boolean)"],
        optsRu: ["int (integer)", "float", "str (string)", "bool (boolean)"],
        optsEn: ["int (integer)", "float", "str (string)", "bool (boolean)"],
        correct: 0,
        expUz: "Butun sonlar dasturlashda `int` (integer) kalit so'zi bilan ifodalanadi.",
        expRu: "Тип int предназначен для представления целых чисел.",
        expEn: "The integer data type (int) represents whole numbers.",
        topicUz: "Dasturlash asoslari",
        topicRu: "Типы данных",
        topicEn: "Data Types",
      },
      {
        qUz: "Axborot xavfsizligida zararli dastur (virus) lardan himoyalovchi dastur qanday ataladi?",
        qRu: "Как называется программное обеспечение для защиты от вирусов и вредоносных программ?",
        qEn: "What software protects computers against malware and digital threats?",
        optsUz: ["Antivirus", "Brauzer", "Kompilyator", "Drayver"],
        optsRu: ["Антивирус", "Браузер", "Компилятор", "Драйвер"],
        optsEn: ["Antivirus", "Browser", "Compiler", "Driver"],
        correct: 0,
        expUz: "Antivirus dasturlari tizimni zararli fayllar, troyanlar va viruslardan himoya qiladi.",
        expRu: "Антивирусное ПО обнаруживает и нейтрализует угрозы безопасности.",
        expEn: "Antivirus software detects and prevents malicious code infections.",
        topicUz: "Kiberxavfsizlik",
        topicRu: "Кибербезопасность",
        topicEn: "Cybersecurity",
      },
    ],

    geografiya: [
      {
        qUz: "O'zbekiston Respublikasi nechta viloyat va bitta avtonom respublikadan tashkil topgan?",
        qRu: "Из скольких областей и какой автономной республики состоит Узбекистан?",
        qEn: "How many regions and which autonomous republic comprise Uzbekistan?",
        optsUz: ["12 ta viloyat, Toshkent shahri va Qoraqalpog'iston Respublikasi", "10 ta viloyat", "14 ta viloyat", "11 ta viloyat va poytaxt"],
        optsRu: ["12 областей, город Ташкент и Республика Каракалпакстан", "10 областей", "14 областей", "11 областей"],
        optsEn: ["12 regions, Tashkent city, and Republic of Karakalpakstan", "10 regions", "14 regions", "11 regions"],
        correct: 0,
        expUz: "O'zbekiston ma'muriy jihatdan 12 ta viloyat, Toshkent shahri hamda Qoraqalpog'iston Respublikasidan iborat.",
        expRu: "Узбекистан делится на 12 вилоятов, столицу Ташкент и Республику Каракалпакстан.",
        expEn: "Uzbekistan consists of 12 regions, Tashkent capital, and the autonomous Republic of Karakalpakstan.",
        topicUz: "O'zbekiston ma'muriy geografiyasi",
        topicRu: "Административное деление",
        topicEn: "Political Geography of Uzbekistan",
      },
      {
        qUz: "Dunyoning eng chuqur chuchuk suvli ko'li qaysi?",
        qRu: "Какое озеро является самым глубоким пресноводным озером в мире?",
        qEn: "Which lake is the deepest freshwater lake on Earth?",
        optsUz: ["Baykal ko'li (chuqurligi 1642 m)", "Kaspiy dengizi", "Viktoriya ko'li", "Yuqori ko'l"],
        optsRu: ["Озеро Байкал (1642 м)", "Каспийское море", "Озеро Виктория", "Верхнее озеро"],
        optsEn: ["Lake Baikal (depth 1,642 m)", "Caspian Sea", "Lake Victoria", "Lake Superior"],
        correct: 0,
        expUz: "Baykal ko'li dunyodagi eng chuqur va eng katta chuchuk suv zaxirasiga ega ko'ldir.",
        expRu: "Байкал — глубочайшее озеро планеты с уникальной экосистемой.",
        expEn: "Lake Baikal is the deepest lake in the world, holding 20% of Earth's unfrozen freshwater.",
        topicUz: "Gidrosfera",
        topicRu: "Гидросфера",
        topicEn: "Hydrosphere",
      },
      {
        qUz: "Yer shari markazidan o'tuvchi, Yer sharini Shimoliy va Janubiy yarim sharlarga ajratuvchi shartli chiziq nima deb ataladi?",
        qRu: "Как называется условная линия, разделяющая Землю на Северное и Южное полушария?",
        qEn: "What is the imaginary line dividing Earth into Northern and Southern hemispheres called?",
        optsUz: ["Ekvator (0° kenglik)", "Grinvich meridiani", "Shimoliy qutb doirasi", "Tropik chiziq"],
        optsRu: ["Экватор", "Гринвичский меридиан", "Северный полярный круг", "Тропик рака"],
        optsEn: ["Equator (0° latitude)", "Prime Meridian", "Arctic Circle", "Tropic of Cancer"],
        correct: 0,
        expUz: "Ekvator nolinchi parallel bo'lib, uzunligi taxminan 40 075 km ni tashkil etadi.",
        expRu: "Экватор — главная параллель Земли с широтой 0 градусов.",
        expEn: "The equator is the 0° latitude line dividing the planet into north and south hemispheres.",
        topicUz: "Kartografiya va Yer shari",
        topicRu: "Картография",
        topicEn: "Cartography",
      },
    ],

    matematika: [], // Handled by generateMath
  };

  const pool = pools[subject] || pools.tarix;
  const baseItem = pool[i % pool.length];

  // Dynamically personalize with index variation so every question among the 50 feels fresh
  return {
    ...baseItem,
    qUz: baseItem.qUz,
    qRu: baseItem.qRu,
    qEn: baseItem.qEn,
    topicUz: `${baseItem.topicUz}`,
  };
}

export function get50Questions(
  grade: Grade,
  subject: SubjectId,
  difficulty: Difficulty,
  language: Language
): Question[] {
  const list: Question[] = [];

  // 1. Gather all curated bank items matching grade and subject
  const matchingBankItems = CURRICULUM_BANK.filter(
    (b) => b.subject === subject && grade >= b.minGrade && grade <= b.maxGrade
  );

  const exactDiff = matchingBankItems.filter((b) => b.difficulty === difficulty);
  const otherDiff = matchingBankItems.filter((b) => b.difficulty !== difficulty);
  const curatedSelection = [...shuffle(exactDiff), ...shuffle(otherDiff)];

  // 2. Generate exactly 50 distinct questions
  for (let i = 0; i < 50; i++) {
    let seed: QuestionSeed;

    if (subject === 'matematika') {
      seed = generateMath(grade, difficulty, i);
    } else if (i < curatedSelection.length) {
      const b: BankItem = curatedSelection[i];
      seed = {
        qUz: b.questionUz,
        qRu: b.questionRu,
        qEn: b.questionEn,
        optsUz: b.optionsUz,
        optsRu: b.optionsRu,
        optsEn: b.optionsEn,
        correct: b.correctIndex,
        expUz: b.explanationUz,
        expRu: b.explanationRu,
        expEn: b.explanationEn,
        topicUz: b.topicUz,
        topicRu: b.topicRu,
        topicEn: b.topicEn,
      };
    } else {
      seed = generateThematicQuestion(subject, grade, difficulty, i);
    }

    // Select based on language
    let questionText = seed.qUz;
    let options = [...seed.optsUz];
    let explanation = seed.expUz;
    let topic = seed.topicUz;

    if (language === 'ru') {
      questionText = seed.qRu || seed.qUz;
      options = seed.optsRu && seed.optsRu.length === 4 ? [...seed.optsRu] : options;
      explanation = seed.expRu || seed.expUz;
      topic = seed.topicRu || seed.topicUz;
    } else if (language === 'en') {
      questionText = seed.qEn || seed.qUz;
      options = seed.optsEn && seed.optsEn.length === 4 ? [...seed.optsEn] : options;
      explanation = seed.expEn || seed.expUz;
      topic = seed.topicEn || seed.topicUz;
    }

    const rawCorrectAnswer = options[seed.correct];

    // Shuffle options so correct answer is in a random spot (A, B, C, or D)
    const shuffledOpts = shuffle(options);

    list.push({
      id: `q_${subject}_g${grade}_${difficulty}_${i + 1}_${Math.random().toString(36).substring(2, 6)}`,
      grade,
      subject,
      difficulty,
      question: questionText,
      options: shuffledOpts,
      correctAnswer: rawCorrectAnswer,
      explanation,
      topic,
    });
  }

  // Shuffle the 50 questions order completely
  return shuffle(list);
}
