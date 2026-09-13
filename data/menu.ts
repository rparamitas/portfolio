export const WEEKDAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const

export type Weekday = (typeof WEEKDAYS)[number]

export const MEAL_SLOTS = [
  "breakfast",
  "snack-morning",
  "lunch",
  "snack-afternoon",
  "dinner",
] as const

export type MealSlot = (typeof MEAL_SLOTS)[number]

export type Persona = "adult" | "children"

export interface Meal {
  name: string
  ingredients: string[]
  note?: string
}

export type PersonaMenu = Record<MealSlot, Meal>

export type DayMenuPlan = Record<Persona, PersonaMenu>

export type WeeklyMenuPlan = Record<Weekday, DayMenuPlan>

export const SLOT_LABELS: Record<MealSlot, string> = {
  breakfast: "Breakfast",
  "snack-morning": "Morning snack",
  lunch: "Lunch",
  "snack-afternoon": "Afternoon snack",
  dinner: "Dinner",
}

export const menuPlan: WeeklyMenuPlan = {
  Monday: {
    adult: {
      breakfast: {
        name: "Bubur Ayam",
        ingredients: ["beras", "dada ayam", "jahe", "daun bawang", "bawang goreng", "kecap manis"],
        note: "Fresh cooked in the morning",
      },
      "snack-morning": {
        name: "Pisang Goreng",
        ingredients: ["pisang", "tepung terigu", "gula pasir", "minyak goreng"],
      },
      lunch: {
        name: "Ayam Goreng Lengkuas + Nasi + Lalapan",
        ingredients: ["ayam", "lengkuas", "bawang putih", "kunyit", "nasi", "timun"],
        note: "Cooked in the morning batch, kept until afternoon",
      },
      "snack-afternoon": {
        name: "Risoles Ragout",
        ingredients: ["kulit risoles", "ayam", "wortel", "susu", "tepung roti"],
      },
      dinner: {
        name: "Sayur Sop + Tempe Goreng",
        ingredients: ["wortel", "kol", "kentang", "tomat", "tempe", "nasi"],
        note: "Light evening cook",
      },
    },
    children: {
      breakfast: {
        name: "Oatmeal Pisang Susu",
        ingredients: ["oat", "pisang", "susu", "madu"],
      },
      "snack-morning": {
        name: "Yogurt Granola",
        ingredients: ["yogurt tawar", "granola", "stroberi"],
      },
      lunch: {
        name: "Ayam Kecap + Nasi",
        ingredients: ["paha ayam", "kecap manis", "bawang putih", "nasi"],
        note: "From the morning batch",
      },
      "snack-afternoon": {
        name: "Puding Susu Karamel",
        ingredients: ["susu", "agar-agar", "gula pasir", "karamel"],
      },
      dinner: {
        name: "Sup Makaroni Ayam",
        ingredients: ["makaroni", "ayam", "wortel", "daun bawang", "susu"],
      },
    },
  },
  Tuesday: {
    adult: {
      breakfast: {
        name: "Roti Bakar Telur Dadar",
        ingredients: ["roti", "telur", "mentega", "saus tomat"],
      },
      "snack-morning": {
        name: "Es Buah",
        ingredients: ["melon", "pepaya", "anggur", "sirup", "es batu"],
      },
      lunch: {
        name: "Ikan Bakar + Tumis Kangkung",
        ingredients: ["ikan kembung", "kangkung", "bawang putih", "cabai merah", "nasi"],
        note: "Marinated and grilled in the morning batch",
      },
      "snack-afternoon": {
        name: "Klepon",
        ingredients: ["tepung ketan", "gula merah", "kelapa parut"],
      },
      dinner: {
        name: "Tumis Tahu Tempe + Nasi",
        ingredients: ["tahu", "tempe", "kecap manis", "bawang merah", "nasi"],
        note: "Quick evening cook",
      },
    },
    children: {
      breakfast: {
        name: "Roti Pisang Bakar",
        ingredients: ["roti", "pisang", "keju", "susu"],
      },
      "snack-morning": {
        name: "Pisang Segar",
        ingredients: ["pisang"],
      },
      lunch: {
        name: "Nasi Goreng Telur",
        ingredients: ["nasi", "telur", "bawang putih", "wortel", "daun bawang"],
        note: "Cooked in the morning batch",
      },
      "snack-afternoon": {
        name: "Susu + Biskuit",
        ingredients: ["susu", "biskuit gandum"],
      },
      dinner: {
        name: "Sup Wortel Kentang",
        ingredients: ["kentang", "wortel", "ayam cincang", "daun bawang", "susu"],
      },
    },
  },
  Wednesday: {
    adult: {
      breakfast: {
        name: "Nasi Goreng Kampung",
        ingredients: ["nasi", "telur", "bawang putih", "kol", "kecap manis"],
        note: "Fresh cooked in the morning",
      },
      "snack-morning": {
        name: "Semangka Potong",
        ingredients: ["semangka"],
      },
      lunch: {
        name: "Rendang Daging + Nasi",
        ingredients: ["daging sapi", "santan kelapa", "cabai merah", "lengkuas", "serai", "nasi"],
        note: "Slow-cooked in the morning batch",
      },
      "snack-afternoon": {
        name: "Cireng Rujak",
        ingredients: ["tepung tapioka", "gula merah", "asam jawa"],
      },
      dinner: {
        name: "Soto Ayam",
        ingredients: ["ayam", "kunyit", "bihun", "taoge", "jeruk nipis"],
      },
    },
    children: {
      breakfast: {
        name: "Bubur Jagung Susu",
        ingredients: ["jagung manis", "susu", "gula pasir", "daun pandan"],
      },
      "snack-morning": {
        name: "Timun Potong",
        ingredients: ["timun"],
      },
      lunch: {
        name: "Telur Dadar Manis + Nasi",
        ingredients: ["telur", "wortel", "tepung terigu", "saus tomat", "nasi"],
        note: "From the morning batch",
      },
      "snack-afternoon": {
        name: "Roti Isi Cokelat",
        ingredients: ["roti", "selai cokelat"],
      },
      dinner: {
        name: "Mie Kuah Ayam",
        ingredients: ["mie telur", "ayam", "sawi", "daun bawang"],
      },
    },
  },
  Thursday: {
    adult: {
      breakfast: {
        name: "Nasi Kuning + Ayam Suwir",
        ingredients: ["nasi", "santan kelapa", "kunyit", "ayam suwir", "serai"],
        note: "Fresh cooked in the morning",
      },
      "snack-morning": {
        name: "Nanas Potong",
        ingredients: ["nanas"],
      },
      lunch: {
        name: "Lele Goreng + Lalapan",
        ingredients: ["lele", "timun", "kemangi", "sambal", "nasi"],
        note: "Fried in the morning batch",
      },
      "snack-afternoon": {
        name: "Getuk Lindri",
        ingredients: ["singkong", "gula pasir", "kelapa parut"],
      },
      dinner: {
        name: "Capcay Kuah + Nasi",
        ingredients: ["brokoli", "wortel", "jamur", "ayam", "bawang putih"],
        note: "Quick evening cook",
      },
    },
    children: {
      breakfast: {
        name: "Nasi Kuning Mild + Ayam Suwir",
        ingredients: ["nasi", "santan kelapa", "kunyit", "ayam suwir"],
      },
      "snack-morning": {
        name: "Jeruk Manis",
        ingredients: ["jeruk"],
      },
      lunch: {
        name: "Ikan Bumbu Kuning (Tanpa Duri)",
        ingredients: ["fillet ikan dori", "kunyit", "daun jeruk", "nasi"],
        note: "From the morning batch, boneless",
      },
      "snack-afternoon": {
        name: "Susu + Roti Tawar",
        ingredients: ["susu", "roti"],
      },
      dinner: {
        name: "Sup Ayam Sayur",
        ingredients: ["ayam", "kentang", "wortel", "labu siam", "daun bawang"],
      },
    },
  },
  Friday: {
    adult: {
      breakfast: {
        name: "Nasi Uduk + Tempe Orek",
        ingredients: ["nasi", "santan kelapa", "tempe", "kecap manis", "kacang tanah"],
        note: "Fresh cooked in the morning",
      },
      "snack-morning": {
        name: "Es Alpukat",
        ingredients: ["alpukat", "susu", "sirup cokelat", "es batu"],
      },
      lunch: {
        name: "Gado-Gado",
        ingredients: ["sayur campur", "tahu", "telur", "bumbu kacang", "lontong"],
        note: "Peanut sauce prepared in the morning batch",
      },
      "snack-afternoon": {
        name: "Bakwan Jagung",
        ingredients: ["jagung", "tepung terigu", "wortel", "minyak goreng"],
      },
      dinner: {
        name: "Mie Goreng Jawa",
        ingredients: ["mie telur", "kol", "ayam", "kecap manis"],
        note: "Quick evening cook",
      },
    },
    children: {
      breakfast: {
        name: "Nasi Uduk Mild + Telur Dadar",
        ingredients: ["nasi", "santan kelapa", "telur"],
      },
      "snack-morning": {
        name: "Melon Potong",
        ingredients: ["melon"],
      },
      lunch: {
        name: "Nugget Ayam + Nasi",
        ingredients: ["nugget ayam", "nasi", "timun", "mayones"],
        note: "From the morning batch",
      },
      "snack-afternoon": {
        name: "Agar-Agar Susu",
        ingredients: ["agar-agar", "susu", "gula pasir"],
      },
      dinner: {
        name: "Spaghetti Bolognese",
        ingredients: ["spaghetti", "daging sapi cincang", "saus tomat", "wortel", "keju"],
      },
    },
  },
  Saturday: {
    adult: {
      breakfast: {
        name: "Pancake Madu",
        ingredients: ["tepung terigu", "telur", "susu", "madu", "mentega"],
      },
      "snack-morning": {
        name: "Smoothie Mangga",
        ingredients: ["mangga", "yogurt", "susu", "madu"],
      },
      lunch: {
        name: "Sate Ayam + Lontong",
        ingredients: ["ayam", "bumbu kacang", "lontong", "kecap manis", "bawang merah"],
        note: "Skewers grilled in the morning batch",
      },
      "snack-afternoon": {
        name: "Cilok Bandung",
        ingredients: ["tepung tapioka", "bumbu kacang", "kecap asin"],
      },
      dinner: {
        name: "Bakso Sapi Kuah",
        ingredients: ["bakso sapi", "mie", "taoge", "kaldu"],
      },
    },
    children: {
      breakfast: {
        name: "Pancake Madu Mini",
        ingredients: ["tepung terigu", "telur", "susu", "madu"],
      },
      "snack-morning": {
        name: "Smoothie Mangga",
        ingredients: ["mangga", "yogurt", "susu"],
      },
      lunch: {
        name: "Lontong Sate Ayam Manis",
        ingredients: ["lontong", "ayam", "bumbu kacang"],
        note: "From the morning batch",
      },
      "snack-afternoon": {
        name: "Cilok",
        ingredients: ["tepung tapioka", "bumbu kacang"],
      },
      dinner: {
        name: "Bakso Mini Kuah",
        ingredients: ["bakso mini", "bihun", "kaldu", "daun bawang"],
      },
    },
  },
  Sunday: {
    adult: {
      breakfast: {
        name: "Roti Bakar Selai + Telur Rebus",
        ingredients: ["roti", "selai kacang", "telur", "susu"],
      },
      "snack-morning": {
        name: "Kurma + Teh Hangat",
        ingredients: ["kurma", "teh"],
      },
      lunch: {
        name: "Ayam Bakar Madu + Nasi",
        ingredients: ["ayam", "madu", "bawang putih", "kecap manis", "nasi"],
        note: "Marinated overnight, grilled in the morning batch",
      },
      "snack-afternoon": {
        name: "Martabak Mini",
        ingredients: ["tepung terigu", "susu", "cokelat", "keju"],
      },
      dinner: {
        name: "Opor Ayam + Nasi",
        ingredients: ["ayam", "santan kelapa", "serai", "kunyit", "nasi"],
        note: "Simmered in the evening",
      },
    },
    children: {
      breakfast: {
        name: "Roti Bakar Selai + Susu",
        ingredients: ["roti", "selai stroberi", "susu"],
      },
      "snack-morning": {
        name: "Anggur Segar",
        ingredients: ["anggur"],
      },
      lunch: {
        name: "Ayam Bakar Madu Mild + Nasi",
        ingredients: ["ayam", "madu", "nasi"],
        note: "From the morning batch",
      },
      "snack-afternoon": {
        name: "Puding Cokelat",
        ingredients: ["puding cokelat", "susu"],
      },
      dinner: {
        name: "Opor Ayam Mild + Nasi",
        ingredients: ["ayam", "santan kelapa", "nasi"],
      },
    },
  },
}

export function menuForDate(date: Date): DayMenuPlan {
  const index = (date.getDay() + 6) % 7
  return menuPlan[WEEKDAYS[index]]
}

export const ALL_INGREDIENTS: string[] = Array.from(
  new Set(
    Object.values(menuPlan).flatMap((day) =>
      MEAL_SLOTS.map((slot) => day.adult[slot])
        .concat(MEAL_SLOTS.map((slot) => day.children[slot]))
        .flatMap((meal) => meal.ingredients),
    ),
  ),
).sort()
