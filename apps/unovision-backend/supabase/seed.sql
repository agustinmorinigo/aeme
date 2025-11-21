INSERT INTO "public"."expenseCategories" (type, name) VALUES
  ('operating',     'Operativo'),
  ('service',       'Servicio'),
  ('supply',        'Insumo'),
  ('miscellaneous', 'Vario'),
  ('extraordinary', 'Extraordinario'),
  ('salary',        'Sueldo'),
  ('daily',         'Diario'),
  ('fuel',          'Combustible'),
  ('perception',    'Percepción'),
  ('stationery',    'Librería'),
  ('cleaning',      'Limpieza'),
  ('maintenance',   'Mantenimiento'),
  ('capture',       'Captura');

INSERT INTO "public"."paymentMethods" (type, name) VALUES
  ('cash',    'Efectivo'),
  ('bna',     'Transferencia - BNA'),
  ('mp',      'Transferencia - MP'),
  ('galicia', 'Transferencia - GALICIA'),
  ('bbva',    'Transferencia - BBVA'),
  ('uala',    'Transferencia - UALA'),
  ('brubank', 'Transferencia - BRUBANK');

INSERT INTO "public"."vatCategories" (type, name) VALUES
  ('registeredResponsible',   'Responsable inscripto'),
  ('monotax',                 'Monotributista'),
  ('exempt',                  'Exento'),
  ('notResponsible',          'No responsable'),
  ('finalConsumer',           'Consumidor final'),
  ('uncategorizedSubject',    'Sujeto no categorizado'),
  ('unregisteredResponsible', 'Responsable no inscripto'),
  ('subjectToVatWithholding', 'IVA sujeto a retención'),
  ('notSubjectToVat',         'IVA no alcanzado'),
  ('registeredResponsibleM',  'Responsable inscripto M');

INSERT INTO "public"."organizations" ("id", "legalName", "businessName", "address", "vatCategoryId", "cuit") VALUES
  ('d5728fcf-3642-4935-9918-22912368aa0b', 'GRUPO PGC CARE',  'Unovision - Avellaneda', 'Avenida Bartolomé Mitre 5202, Wilde, Avellaneda',      1, '30716795825'),
  ('32921ea7-cec7-46ab-a012-a160ae847d8a', 'GENIKI',          'COAK',                   'Avenida Presidente Perón 5422, Alejandro Korn',        1, '5748542783'),
  ('d579483f-6f06-4c4e-aae4-b19515d44caa', 'GRUPO PGC CARE',  'Unovision - Lanús',      'Avenida Hipolito Yrigoyen 4796 - Lanús, Buenos Aires', 1, '30716795825');

INSERT INTO "public"."roles" ("id", "name", "description") VALUES
  (1, 'admin',      ''),
  (2, 'employee',   ''),
  (3, 'patient',    ''),
  (4, 'doctor',     ''),
  (5, 'accountant', '');