import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useProductStore = defineStore('products', () => {
  const products = ref([
  // Processadores
  {
    id: 1,
    name: 'Processador AMD Ryzen 7 9800X3D, 8-Core',
    price: 2899.99,
    image: ['/images/processor1.jpg', '/images/processor1_alt.jpg', '/images/processor1_alt2.jpg'],
    category: 'Processadores',
    specifications: '16-Threads, 4.7GHz (5.2GHz Turbo), Cache 104MB, AM5, 100-100001084WOF'
  },
  {
    id: 2,
    name: 'Processador AMD Ryzen 5 8400F, 6-Core',
    price: 999.99,
    image: ['/images/processor2.jpg', '/images/processor2_alt.jpg', '/images/processor2_alt2.jpg'],
    category: 'Processadores',
    specifications: '12-Threads, 4.2GHz (4.7GHz Turbo), Cache 16MB, AM5, 100-100001591BOX'
  },
  {
    id: 3,
    name: 'Processador Intel Core Ultra 5 225F, 10-Core',
    price: 1799.99,
    image: ['/images/processor3.jpg'],
    category: 'Processadores',
    specifications: '10-Threads, 3.3GHz (4.9GHz Turbo), Cache 20MB, LGA1851, BX80768225F'
  },
  {
    id: 4,
    name: 'Processador Intel Core Ultra 5 245KF, 14-Core',
    price: 1499.99,
    image: ['/images/processor4.jpg'],
    category: 'Processadores',
    specifications: '14-Threads, 4.2GHz (5.2GHz Turbo), Cache 24MB, LGA1851, BX80768245KF'
  },
  {
    id: 5,
    name: 'PProcessador Intel Core i5-10400F, 6-Core,',
    price: 4500.00,
    image: ['/images/processor5.jpg'],
    category: 'Processadores',
    specifications: '12-Threads, 2.9Ghz (4.3Ghz Turbo), Cache 12MB, LGA1200, BX8070110400F'
  },
  {
    id: 6,
    name: 'Processador Intel Core i9-14900K, 24-Core',
    price: 2999.99,
    image: ['/images/processor6.jpg'],
    category: 'Processadores',
    specifications: '32-Threads, 3.2GHz (6.0GHz Turbo), Cache 36MB, LGA1700, BX8071514900K'
  },

  // Placas-mãe
  {
    id: 7,
    name: 'Placa Mae Asus Prime H510M-A R2.0, DDR4',
    price: 539.99,
    image: ['/images/motherboard1.jpg', '/images/motherboard1_alt.jpg', '/images/motherboard1_alt2.jpg'],
    category: 'Placas-mãe',
    specifications: 'LGA1200, M-ATX, Chipset Intel H470, PRIME-H510M-A-R2.0'
  },
  {
    id: 8,
    name: 'Placa Mae MSI Pro B650M-E, DDR5',
    price: 699.99,
    image: ['/images/motherboard2.jpg', '/images/motherboard2_alt.jpg', '/images/motherboard2_alt2.jpg'],
    category: 'Placas-mãe',
    specifications: 'Socket AMD AM5, M-ATX, Chipset AMD B650, PRO-B650M-E'
  },
  {
    id: 9,
    name: 'Placa Mae Asus Prime H610M-CS D4, DDR4',
    price: 598.99,
    image: ['/images/motherboard3.jpg', '/images/motherboard3_alt.jpg', '/images/motherboard3_alt2.jpg'],
    category: 'Placas-mãe',
    specifications: 'LGA1700, M-ATX, Chipset Intel H610, PRIME-H610M-CS-D4'
  },
  {
    id: 10,
    name: 'Placa Mae Asus Prime B840-Plus Wi-Fi, DDR5',
    price: 1799.99,
    image: ['/images/motherboard4.jpg', '/images/motherboard4_alt.jpg', '/images/motherboard4_alt2.jpg'],
    category: 'Placas-mãe',
    specifications: 'Socket AMD AM5, ATX, Chipset AMD B840, PRIME-B840-PLUS-WIFI'
  },
  {
    id: 11,
    name: 'Placa Mae Asus Prime B840M-A WiFi, DDR5',
    price: 1699.99,
    image: ['/images/motherboard5.jpg', '/images/motherboard5_alt.jpg', '/images/motherboard5_alt2.jpg'],
    category: 'Placas-mãe',
    specifications: 'Socket AMD AM5, M-ATX, Chipset AMD B840, PRIME-B840M-A-WIFI'
  },
  {
    id: 12,
    name: 'Placa Mae Asus Prime B840M-A, DDR5',
    price: 1499.99,
    image: ['/images/motherboard6.jpg', '/images/motherboard6_alt.jpg', '/images/motherboard6_alt2.jpg'],
    category: 'Placas-mãe',
    specifications: 'Socket AMD AM5, M-ATX, Chipset AMD B840, PRIME-B840M-A'
  },

  // Memórias-RAM
  {
    id: 13,
    name: 'Memoria Para Notebook HikSemi Hiker, 16GB (1x16GB)',
    price: 229.99,
    image: ['/images/ram1.jpg', '/images/ram1_alt.jpg', '/images/ram1_alt2.jpg'],
    category: 'Memorias-RAM',
    specifications: 'DDR4, 3200MHz, C22, HSC416S32Z1'
  },
  {
    id: 14,
    name: 'Memoria Adata, 8GB (1x8GB)',
    price: 142.99,
    image: ['/images/ram2.jpg'],
    category: 'Memorias-RAM',
    specifications: 'Kingston Fury Beast, 32GB (2x16GB), DDR4, 3600MHz, latência C17, perfil XMP'
  },
  {
    id: 15,
    name: 'Memoria Corsair Vengeance, 128GB (2x64GB)',
    price: 400.00,
    image: ['/images/ram3.jpg', '/images/ram3_alt.jpg', '/images/ram3_alt2.jpg'],
    category: 'Memorias-RAM',
    specifications: 'DDR5, 6400MHz, C42, Preto, CMK128GX5M2B6400C42'
  },
  {
    id: 16,
    name: 'Memoria Corsair Vengeance, RGB, 16GB (1x16GB)',
    price: 436.99,
    image: ['/images/ram4.jpg'],
    category: 'Memorias-RAM',
    specifications: 'DDR5, 5600MHz, C40, Cinza, CMH16GX5M1B5600Z40'
  },
  {
    id: 17,
    name: 'Memoria Team Group Expert, 96GB (2x48GB)',
    price: 3179.99,
    image: ['/images/ram5.jpg', '/images/ram5_alt.jpg', '/images/ram5_alt2.jpg'],
    category: 'Memorias-RAM',
    specifications: 'DDR5, 6800MHz, C36, Preto, CTCED596G6800HC36DDC01'
  },
  {
    id: 18,
    name: 'Memoria Kingston Fury Renegade, RGB, 128GB (4x32GB) DDR4',
    price: 2738.99,
    image: ['/images/ram6.jpg', '/images/ram6_alt.jpg', '/images/ram6_alt2.jpg'],
    category: 'Memorias-RAM',
    specifications: '3600MHz, C18, Prata e Preto, KF436C18RB2AK4-128'
  },

  // GPUs
  {
    id: 19,
    name: 'Placa de Video Zotac GeForce RTX 5070',
    price: 4699.99,
    image: ['/images/gpu1.jpg', '/images/gpu1_alt.jpg', '/images/gpu1_alt2.jpg'],
    category: 'GPUs',
    specifications: 'Solid OC, 12GB, GDDR7, 192-bit, ZT-B50700J-10P-NAC'
  },
  {
    id: 20,
    name: 'Placa de Video INNO3D GeForce RTX 5060',
    price: 3699.99,
    image: ['/images/gpu2.jpg', '/images/gpu2_alt.jpg'],
    category: 'GPUs',
    specifications: 'Ti Twin X2 OC, 16GB, GDDR7, 128-bit, N506T2-16D7X-191073N-NAC'
  },
  {
    id: 21,
    name: 'Placa de Video MSI GeForce RTX 4070',
    price: 4759.99,
    image: ['/images/gpu3.jpg', '/images/gpu3_alt.jpg'],
    category: 'GPUs',
    specifications: 'Super Ventus 2X OC, 12GB, GDDR6X, 192-bit, 912-V513-829'
  },
  {
    id: 22,
    name: 'Placa de Video INNO3D GeForce RTX 5060',
    price: 3799.99,
    image: ['/images/gpu4.jpg', '/images/gpu4_alt.jpg'],
    category: 'GPUs',
    specifications: 'AMD Radeon RX 7900 XTX, 24GB GDDR6, 6144 stream processors, clock base 2300MHz, boost 2500MHz, HDMI 2.1, 2x DisplayPort 2.0, USB-C, FidelityFX, Ray Tracing'
  },
  {
    id: 23,
    name: 'Placa de Video INNO3D GeForce RTX 5060',
    price: 3500.00,
    image: ['/images/gpu5.jpg'],
    category: 'GPUs',
    specifications: 'Ti Twin X2 OC White, 8GB, GDDR7, 128-bit, N506T2-08D7X-193075W'
  },
  {
    id: 24,
    name: 'Placa de Video MSI GeForce RTX 5060 Ti',
    price: 1500.00,
    image: ['/images/gpu6.jpg', '/images/gpu6_alt.jpg', '/images/gpu6_alt2.jpg'],
    category: 'GPUs',
    specifications: 'Gaming OC, 8GB, GDDR7, 128-bit, G506T-8GC'
  },

  // SSDs
  {
    id: 25,
    name: 'SSD Lexar Professional NM1090, 2TB, M.2 2280',
    price: 800.00,
    image: ['/images/ssd1.jpg'],
    category: 'SSDs',
    specifications: 'PCIe NVMe, Leitura 12000MB/s, Gravacao 11000MB/s, LNM1090002T-RNANG'
  },
  {
    id: 26,
    name: 'SSD MSI Spatium M371, 500GB, M.2 2280',
    price: 279.99,
    image: ['/images/ssd2.jpg', '/images/ssd2_alt.jpg'],
    category: 'SSDs',
    specifications: 'PCIe NVMe, Leitura 2200MB/s, Gravacao 1150MB/s, S78-440K160-P83'
  },
  {
    id: 27,
    name: 'SSD WD Black SN7100, 500GB, M.2 2280',
    price: 559.99,
    image: ['/images/ssd3.jpg'],
    category: 'SSDs',
    specifications: 'PCIe NVMe, Leitura 6800MB/s, Gravacao 5800MB/s, WDS500G4X0E'
  },
  {
    id: 28,
    name: 'SSD Corsair MP700 Elite, 2TB, M.2 2280',
    price: 1799.99,
    image: ['/images/ssd4.jpg'],
    category: 'SSDs',
    specifications: 'PCIe NVMe, Leitura 10000MB/s, Gravacao 8500MB/s, CSSD-F2000GBMP700EHS'
  },
  {
    id: 29,
    name: 'SSD Corsair MP700 Pro SE, 4TB, M.2 2280',
    price: 4299.99,
    image: ['/images/ssd5.jpg'],
    category: 'SSDs',
    specifications: 'PCIe 5.0 x4 NVMe, Leitura 14000MB/s, Gravacao 12000MB/s, Preto, CSSD-F4000GBMP700PNHS'
  },
  {
    id: 30,
    name: 'SSD Crucial E100, 1TB, M.2 2280',
    price: 494.99,
    image: ['/images/ssd6.jpg'],
    category: 'SSDs',
    specifications: 'NVMe, Leitura 5000MB/s, Gravacao 4500MB/s, Preto, CT1000E100SSD8'
  },

  // Monitores
  {
    id: 31,
    name: 'Monitor Gamer Pichau Cepheus VPRO32, 32 Pol, VA, Curvo, 2K, 165Hz, 1ms',
    price: 5000.00,
    image: ['/images/monitor.jpg', '/images/monitor1_alt.jpg', '/images/monitor1_alt2.jpg'],
    category: 'Monitores',
    specifications: '32 polegadas, VA Curvo, 2K (2560x1440), 165Hz, 1ms, FreeSync, HDMI, DisplayPort, Código: PG-CFV32-BL01'
  },
  {
    id: 32,
    name: 'Monitor Gamer Pichau Centauri Pulse 27, 27 Pol, IPS, 2K, 165Hz, 1ms',
    price: 1099.99,
    image: ['/images/monitor2.jpg', '/images/monitor2_alt.jpg', '/images/monitor2_alt2.jpg'],
    category: 'Monitores',
    specifications: '27 polegadas, IPS, 2K (2560x1440), 165Hz, 1ms, FreeSync, HDMI, DisplayPort, Código: PG-CRPLS27-BL01'
  },
  {
    id: 33,
    name: 'Monitor LG UltraGear 27GN950-B, 27 Pol, IPS, 4K, 144Hz, 1ms',
    price: 699.90,
    image: ['/images/monitor3.jpg', '/images/monitor3_alt.jpg', '/images/monitor3_alt2.jpg'],
    category: 'Monitores',
    specifications: '27 polegadas, IPS, 4K (3840x2160), 144Hz, 1ms, G-Sync, HDMI, DisplayPort, Código: 27GN950-B'
  },
  {
    id: 34,
    name: 'Monitor Samsung Odyssey G7, 28 Pol, VA, Curvo, 4K, 144Hz, 1ms',
    price: 999.90,
    image: ['/images/monitor4.jpg', '/images/monitor4_alt.jpg', '/images/monitor4_alt2.jpg'],
    category: 'Monitores',
    specifications: '28 polegadas, VA Curvo, 4K (3840x2160), 144Hz, 1ms, G-Sync, FreeSync, HDMI, DisplayPort, Código: LC28G70'
  },
  {
    id: 35,
    name: 'Monitor Gamer Acer Ultra-Thin',
    price: 649.00,
    image: ['/images/monitor5.jpg', '/images/monitor5_alt.jpg', '/images/monitor5_alt2.jpg'],
    category: 'Monitores',
    specifications: 'SA240Y G0, 23.8 Pol, IPS, FHD, 1ms, 120Hz, Adaptive-Sync, HDMI/VGA, UM.QS0AA.005'
  },
  {
    id: 36,
    name: 'Monitor Gamer Samsung Odyssey G5',
    price: 1199.99,
    image: ['/images/monitor6.jpg', '/images/monitor6_alt.jpg', '/images/monitor6_alt2.jpg'],
    category: 'Monitores',
    specifications: '27 Pol, VA, QHD, 1ms, 165Hz, FreeSync, HDMI/DP, LS27CG552ELMZD'
  },

  // Periféricos
  {
    id: 37,
    name: 'Cadeira Ergonomica TGIF T0',
    price: 3399.99,
    image: ['/images/cadeira1.jpg', '/images/cadeira2.jpg', '/images/cadeira3.jpg'],
    category: 'Periféricos',
    specifications: 'Espuma Moldada, Braco 3D, Preto, T0-N'
  },
  {
    id: 38,
    name: 'Mouse Gamer Redragon Neva',
    price: 239.99,
    image: ['/images/peripheral2.jpg', '/images/peripheral2_alt.jpg', '/images/peripheral2_alt2.jpg'],
    category: 'Periféricos',
    specifications: '26000DPI, 6 Botoes, Preto, M815'
  },
  {
    id: 39,
    name: 'Headset Gamer Cooler Master CH351',
    price: 700.00,
    image: ['/images/peripheral3.jpg', '/images/peripheral3_alt.jpg', '/images/peripheral3_alt2.jpg'],
    category: 'Periféricos',
    specifications: 'Drivers 50mm, Bluetooth, Preto, CH-351'
  },
  {
    id: 40,
    name: 'Teclado Mecanico Razer Blackwindow V3 Tenkeyless',
    price: 300.00,
    image: ['/images/teclado1.jpg', '/images/teclado2.jpg', '/images/teclado3.jpg'],
    category: 'Periféricos',
    specifications: 'RGB, Switch Amarelo, Preto, RZ0303491800'
  },
  {
    id: 41,
    name: 'Webcam Logitech C922',
    price: 400.00,
    image: ['/images/cam1.jpg', '/images/cam2.jpg', '/images/cam3.jpg'],
    category: 'Periféricos',
    specifications: 'Pro Stream, 960-001087'
  },
  {
    id: 42,
    name: 'Microfone Condensador Redragon',
    price: 800.00,
    image: ['/images/mic1.jpg', '/images/mic2.jpg', '/images/mic3.jpg'],
    category: 'Periféricos',
    specifications: 'Adne, RGB, USB, Preto, GM212'
  }
]);

  return {products}
})
