import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";

export const sexes = [
  {
    value: "male",
    label: "Male",
  },
  {
    value: "female",
    label: "Female",
  },
];

export const statuses = [
  {
    value: "backlog",
    label: "Backlog",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "todo",
    label: "Todo",
    icon: CircleIcon,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: StopwatchIcon,
  },
  {
    value: "done",
    label: "Done",
    icon: CheckCircledIcon,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: CrossCircledIcon,
  },
];

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpIcon,
  },
];

export const exampleData: Array<{
  speaker: string;
  message: string;
}> = [
  {"speaker": "1", "message": "Selamat pagi Ibuk."},
  {"speaker": "2", "message": "Selamat pagi dok."},
  {"speaker": "1", "message": "Silahkan duduk buk."},
  {"speaker": "2", "message": "Oh ya Terima kasih Dok."},
  {"speaker": "1", "message": "Ibuk. Perkenalkan nama saya Badri Zam Zammi dari fakultas kedokteran X yang saat ini dalam tahap pembelajaran. Disini saya menggantikan Dokter Upit yang berhalangan hadir. Akan tetapi jangan khawatir buk disini saya memiliki ilmu yang cukup. Oh ya apakah saya boleh tahu nama ibuk?"},
  {"speaker": "2", "message": "Nama saya Salwa Nur Avivah."},
  {"speaker": "1", "message": "Sebaiknya saya memanggil ibuk dengan buk nur atau bagaimana?"},
  {"speaker": "2", "message": "Panggil saja ibuk salwa Dok."},
  {"speaker": "1", "message": "Baik Ibu Salwa apakah saya boleh tahu umur, tinggi badan, berat badan, pekerjaan, dan alamat ibuk?"},
  {"speaker": "2", "message": "Sekarang umur saya 25 tahun, tinggi saya 175 cm dan berat badan saya 100kg, saya seorang kontraktor dan alamat saya di pakjo."},
  {"speaker": "1", "message": "Baik Ibuk Salwa apakah ada yang bisa saya bantu dari Ibuk?"},
  {"speaker": "2", "message": "Ini dok saya mengalami sakit kepala."},
  {"speaker": "1", "message": "Sakit kepala disebelah mana ya buk?"},
  {"speaker": "2", "message": "Di semua bagian kepala."},
  {"speaker": "1", "message": "Oh di semuanya ya buk. Lalu bisa dijelaskan seperti apa rasanya buk?"},
  {"speaker": "2", "message": "Rasanya berat sekali dan sakit dok."},
  {"speaker": "1", "message": "Mulai sejak kapan ya buk sakitnya muncul?"},
  {"speaker": "2", "message": "Sejak beberapa hari ini dok."},
  {"speaker": "1", "message": "Bisa dijelaskan buk kapan munculnya sakit kepala ini. Apakah saat bergerak atau saat berfikir keras?"},
  {"speaker": "2", "message": "Oh itu sakit kepala ini saya rasakan hampir di sebagian waktu lebih tepatnya hampir disetiap waktu dok."},
  {"speaker": "1", "message": "Oh begitu ya buk. Berarti Ibuk terus-terusan mengalaminya?"},
  {"speaker": "2", "message": "Sebenarnya tidak dok saat saya beristirahat. Sakitnya sedikit hilang. Tapi akhir-akhir ini terasa lebih berat dok."},
  {"speaker": "1", "message": "Pasti sangat mengganggu ya buk? Lalu apakah ada keluhan lain buk?"},
  {"speaker": "2", "message": "Ya dok saya merasakan pundak saya terasa berat dan hari ini saya merasakan tubuh saya sangat lemas dan juga saya hampir pingsan dok."},
  {"speaker": "1", "message": "Oh berarti selain sakit kepala ibuk juga merasakan pundak terasa berat, badan terasa lemas dan hampir mengalami pingsan?"},
  {"speaker": "2", "message": "Benar dok."},
  {"speaker": "1", "message": "Apakah ada yang ingin ditanyakan buk?"},
  {"speaker": "2", "message": "Oh tidak dok."},
  {"speaker": "1", "message": "Baik buk kalau begitu saya akan menanyakan beberapa pertanyan kepada ibuk. Apakah boleh buk?"},
  {"speaker": "2", "message": "Boleh dok. Silahkan."},
  {"speaker": "1", "message": "Saya akan menanyakan riwayat penyakit ibuk. Ini sangat penting untuk membantu menyelesaikan maslah ibuk. Apakah dahulu ibuk pernah mengalami keluhan yang sama dengan sekarang?"},
  {"speaker": "2", "message": "Sepertinya tidak dok. Kalau pusing biasa sih kadang saya mengalami tetapi tidak seperti ini dok."},
  {"speaker": "1", "message": "Apakah dahulu ibuk pernah mengalami penyakit lain selain penyakit ini? Di masa kecil mungkin? Atau saat dewasa?"},
  {"speaker": "2", "message": "Saya rasa tidak dok."},
  {"speaker": "1", "message": "Apakah keluarga ibuk memiliki penyakit kronis atau penyakit turunan. mungkin dari ayah, ibu, kakek, dan nenek?"},
  {"speaker": "2", "message": "Sepertinya keluarga saya tidak memiliki penyakit seperti itu dok."},
  {"speaker": "1", "message": "Apakah ibuk memiliki masalah di keluarga dan pekerjaan ibuk?"},
  {"speaker": "2", "message": "Keluarga dan pekerjaan saya baik-baik saja dok."},
  {"speaker": "1", "message": "Berarti tidak ada masalah ya buk di keluarga dan pekerjaan."},
  {"speaker": "2", "message": "Iya dok."},
  {"speaker": "1", "message": "Lalu bisa jelaskan buk bagaimana pola makan dan olahraga ibuk?"},
  {"speaker": "2", "message": "Jujur saja dok sebagai orang yang sangat sibuk saya jarang mengonsumsi masakan yang menyehatkan seperti sayur, buah, daging, susu dan lain. Saya kalau makan lebih sering delivery dok selain cepat dan enak pula. Dan tidak mengganggu waktu kerja saya. Kalau olahraga jangan ditanya lagi pasti tidak pernah dok karena saya tidak ada waktu."},
  {"speaker": "1", "message": "Oh berarti ibuk tidak memiliki riwayat penyakit kronis lainnya, suka makan makanan cepat saji ya buk dan jarang berolah raga.. Benar begitu buk?"},
  {"speaker": "2", "message": "Benar dok."},
  {"speaker": "1", "message": "Baik buk saya akan melakukan pemeriksaan fisik/badan terhadap buk. Silahkan merebahkan diri di sini buk."},
  {"speaker": "2", "message": "Oya dok baik."},
  {"speaker": "1", "message": "(periksa detak jantung, tekanan darah, dll), baik buk silahkan duduk kembali."},
  {"speaker": "2", "message": "Oya terima kasih dok."},
  {"speaker": "1", "message": "Sekarang saya akan menyampaikan hasil pemeriksaan saya tadi buk. Dari pemeriksaan tadi tekanan darah ibuk meningkat sampai 180/100mg. Tekanan darah normal itu berkisar antara 100-120/100mg ya buk. Jelas disini tekanan darah ibuk sangat tinggi diatas tekanan darah normal. Tidak heran jika ibuk mengalami sakit di pundak yang ibuk bilang seperti membawa beban berat dipundak karena kalau tensi naik ya seperti itu akan terasa berat dan nyeri. Lalu disini ibuk juga mengalami berat badan meningkat. Melihat tinggi 175cm dan berat badan ibuk 100kg, itu sudah tidak bagus karena jika tingginya 175 maka berat badan yang sesuai 75kg dan sekarang ini ibuk termasuk mengalami obesitas. Berdasarkan pemeriksaan tersebut ibuk mengalami hipertensi grade 2. Sebelumnya apa ibuk pernah mendengar apa itu hipertensi grade 2?"},
  {"speaker": "2", "message": "Saya taunya hipertensi itu darah tinggi yang disebabkan karena kebanyakan makan daging dok."},
  {"speaker": "1", "message": "Iya kurang lebih begitu tapi saya tambahkan bahwa hipertensi grade 2 ini sama artinya dengan hipertensi tingkat 2, hipertensi yang sedikit lebih parah dari hipertensi biasa yang tekanan darahnya 160-180. Ini bisa disebabkan karena pola hidup yang kurang sehat seperti kurang makan makanan yang mengandung asupan gizi yang cukup seperti sayur, buah dan susu, kurang olahraga, merokok, minum alkohol dan obesitas atau kegemukan. Apakah ibuk mengerti?"},
  {"speaker": "2", "message": "Mengerti dok. Jadi saya harus bagaimana sekarang dok?"},
  {"speaker": "1", "message": "Disini tentunya ibuk harus banyak beristirahat untuk meringankan penyakit ibuk. Lalu kurangi makan makanan cepat saji ya buk. Usahakan makan makanan yang banyak mengandung vitamin dan mineral agar asupan gizi ibuk tercukupi. Lalu ini resepnya ya buk disini ada obat tablet yaitu captropil 25mg, diminum 2 kali sehari ya buk pagi dan sore, 1 jam sebelum makan. Lalu juga ada obat tablet yaitu parasetamol 500 mg diminum 3 kali sehari, kalau bisa obatnya dihabiskan ya buk. Ini bukan untuk menyembuhkan tapi mengurangi rasa sakit karena hipertensi tidak bisa disembuhkan tapi diturunkan tekanan darahnya."},
  {"speaker": "2", "message": "Untuk menurunkan tekanan darahnya bagaimana dok?"},
  {"speaker": "1", "message": "Menurunkan berat badan dengan diet sehat, makan teratur dan makan sayur, terutama olahraga teratur dengan frekuensi latihan sebaiknya 3 kali perminggu dan paling baik 5 kali perminggu dengan waktu 20-25 menit sekali latihan, mengurangi konsumsi daging, perbanyak buah dan minum air putih. Kurangi tidur malam dan jika sudah menerapkan pola hidup sehat seperti itu maka penyakit yang ibuk derita juga bisa dikontrol."},
  {"speaker": "2", "message": "Baiklah dok saya akan mencoba saran dokter untuk merubah pola hidup saya. Terima kasih atas sarannya."},
  {"speaker": "1", "message": "Sama-sama buk. Apa ada yang ingin ibuk tanyakan lagi?"},
  {"speaker": "2", "message": "Tidak dok"},
  {"speaker": "1", "message": "Baik ibuk apabila tidak ada yang ditanyakan lagi. Semoga cepat sembuh ibuk. Apabila ada yang ditanyakan ibuk bisa menghubungi nomor yang ada di kartu nama saya ini."},
  {"speaker": "2", "message": "Ya dok. Terima kasih atas bantuannya."},
  {"speaker": "1", "message": "Sama-sama ibuk."}
]