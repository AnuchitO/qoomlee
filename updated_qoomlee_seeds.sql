-- =============================================================
-- QOOMLEE AIRLINE — COMPLETE SEED DATA (UPDATED)
-- Version 1.1 | Updated for meaningful flight_type column
-- Schema change: replaced is_domestic boolean with flight_type enum
-- Values: domestic, international, mixed
-- =============================================================

BEGIN;

-- ------------------------------------------------------------
-- 1. AIRPORTS - Updated schema with meaningful flight_type column
-- ------------------------------------------------------------
INSERT INTO airports (iata_code, name_en, name_th, city_en, country_code, timezone, terminal, flight_type, is_active) VALUES
  ('KKC','Khon Kaen Airport','ท่าอากาศยานขอนแก่น','Khon Kaen','TH','Asia/Bangkok','1','domestic',TRUE),
  ('BKK','Suvarnabhumi Airport','ท่าอากาศยานสุวรรณภูมิ','Bangkok','TH','Asia/Bangkok','Qoomlee-T2','international',TRUE),
  ('DMK','Don Mueang International Airport','ท่าอากาศยานดอนเมือง','Bangkok','TH','Asia/Bangkok','1','international',TRUE),
  ('CNX','Chiang Mai International Airport','ท่าอากาศยานเชียงใหม่','Chiang Mai','TH','Asia/Bangkok','1','mixed',TRUE),
  ('HKT','Phuket International Airport','ท่าอากาศยานภูเก็ต','Phuket','TH','Asia/Bangkok','1','mixed',TRUE),
  ('HDY','Hat Yai International Airport','ท่าอากาศยานหาดใหญ่','Hat Yai','TH','Asia/Bangkok','1','domestic',TRUE),
  ('KBV','Krabi Airport','ท่าอากาศยานกระบี่','Krabi','TH','Asia/Bangkok','1','domestic',TRUE),
  ('UTP','U-Tapao International Airport','ท่าอากาศยานอู่ตะเภา','Pattaya','TH','Asia/Bangkok','1','mixed',TRUE),
  ('CEI','Chiang Rai International Airport','ท่าอากาศยานเชียงราย','Chiang Rai','TH','Asia/Bangkok','1','domestic',TRUE),
  ('NST','Nakhon Si Thammarat Airport','ท่าอากาศยานนครศรีธรรมราช','Nakhon Si Thammarat','TH','Asia/Bangkok','1','domestic',TRUE),
  ('PER','Perth Airport','เพิร์ธแอร์พอร์ต','Perth','AU','Australia/Perth','T1','international',TRUE),
  ('MEL','Melbourne Airport','เมลเบิร์นแอร์พอร์ต','Melbourne','AU','Australia/Melbourne','T2','international',TRUE),
  ('SYD','Sydney Airport','ซิดนีย์แอร์พอร์ต','Sydney','AU','Australia/Sydney','T1','international',TRUE),
  ('BNE','Brisbane Airport','บริสเบนแอร์พอร์ต','Brisbane','AU','Australia/Brisbane','T2','international',TRUE),
  ('HNL','Daniel K. Inouye International Airport','ดาเนียล เค. โินัวเซ นานาชาติ','Honolulu','US','Pacific/Honolulu','T1','international',TRUE),
  ('ICN','Incheon International Airport','อินช็อนนานาชาติ','Seoul','KR','Asia/Seoul','T1','international',TRUE),
  ('KIX','Kansai International Airport','คันไซนานาชาติ','Osaka','JP','Asia/Tokyo','T1','international',TRUE),
  ('HND','Haneda Airport','ฮะเนะดะ','Tokyo','JP','Asia/Tokyo','T1','international',TRUE),
  ('SIN','Singapore Changi Airport','ชางกี ประเทศสิงคโปร์','Singapore','SG','Asia/Singapore','T1','international',TRUE),
  ('KUL','Kuala Lumpur International Airport','กัวลาลัมเปอร์นานาชาติ','Kuala Lumpur','MY','Asia/Kuala_Lumpur','T1','international',TRUE),
  ('BKK','Don Mueang International Airport','ดอนเมือง','Bangkok','TH','Asia/Bangkok','T1','international',TRUE),
  ('CNX','Chiang Mai International Airport','เชียงใหม่','Chiang Mai','TH','Asia/Bangkok','T1','mixed',TRUE),
  ('HKT','Phuket International Airport','ภูเก็ต','Phuket','TH','Asia/Bangkok','T1','mixed',TRUE),
  ('URT','Surat Thani Airport','สุราษฎร์ธานี','Surat Thani','TH','Asia/Bangkok','T1','domestic',TRUE),
  ('NAW','Narathiwat Airport','นราธิวาส','Narathiwat','TH','Asia/Bangkok','T1','domestic',TRUE),
  ('HDY','Hat Yai International Airport','หาดใหญ่','Hat Yai','TH','Asia/Bangkok','T1','domestic',TRUE),
  ('KBV','Krabi Airport','กระบี่','Krabi','TH','Asia/Bangkok','T1','domestic',TRUE),
  ('USM','Samui Airport','สมุย','Ko Samui','TH','Asia/Bangkok','T1','domestic',TRUE),
  ('DMK','Don Mueang International Airport','ดอนเมือง','Bangkok','TH','Asia/Bangkok','T2','international',TRUE),
  ('BKK','Suvarnabhumi Airport','สุวรรณภูมิ','Bangkok','TH','Asia/Bangkok','T1','international',TRUE);

-- ------------------------------------------------------------
-- 2. AIRCRAFT
-- ------------------------------------------------------------
INSERT INTO aircraft (tail_number, manufacturer, model, seating_capacity, age_years, status) VALUES
  ('HS-ABC','Airbus','A320-200',180,5,'active'),
  ('HS-DEF','Boeing','737-800',189,3,'active'),
  ('HS-GHI','Airbus','A350-900',319,2,'active'),
  ('HS-JKL','Boeing','777-300ER',396,4,'active'),
  ('HS-MNO','Airbus','A321-200',220,6,'active'),
  ('HS-PQR','Boeing','787-9',290,1,'active'),
  ('HS-STU','Airbus','A330-300',293,3,'active'),
  ('HS-VWX','Boeing','747-8',467,7,'active'),
  ('HS-XYZ','Embraer','E190',114,4,'active'),
  ('HS-AAA','Bombardier','CRJ900',90,5,'active');

-- ------------------------------------------------------------
-- 3. STAFF
-- ------------------------------------------------------------
INSERT INTO staff (employee_id, first_name, last_name, position, department, contact_email, hire_date, is_active) VALUES
  ('STF001','Somsak','Jaidee','Check-in Agent','Operations','somsak.j@qoomlee.air','2024-01-15',TRUE),
  ('STF002','Ornicha','Petch','Gate Agent','Operations','ornicha.p@qoomlee.air','2024-02-20',TRUE),
  ('STF003','Apichart','Sri','Customer Service','Customer','apichart.s@qoomlee.air','2024-03-10',TRUE),
  ('STF004','Siriporn','Thong','Flight Attendant','Cabin Crew','siriporn.t@qoomlee.air','2024-04-05',TRUE),
  ('STF005','Kittipong','Wong','Pilot','Flight Crew','kittipong.w@qoomlee.air','2024-01-20',TRUE),
  ('STF006','Nattida','Srisawat','Reservation Agent','Reservations','nattida.s@qoomlee.air','2024-05-12',TRUE),
  ('STF007','Pongsak','Ruang','Ground Staff','Operations','pongsak.r@qoomlee.air','2024-06-18',TRUE),
  ('STF008','Malee','Chen','Security Officer','Security','malee.c@qoomlee.air','2024-07-22',TRUE),
  ('STF009','Anucha','Pim','Maintenance Technician','Technical','anucha.p@qoomlee.air','2024-08-30',TRUE),
  ('STF010','Patcharapa','Sae','Baggage Handler','Operations','patcharapa.s@qoomlee.air','2024-09-15',TRUE);

-- ------------------------------------------------------------
-- 4. FLIGHTS
-- ------------------------------------------------------------
INSERT INTO flights (flight_number, airline_code, aircraft_id, origin_airport, destination_airport, departure_time, arrival_time, duration_minutes, status) VALUES
  ('QL101','QL','HS-ABC','BKK','DMK','2026-05-15 08:00:00+07','2026-05-15 09:30:00+07',90,'scheduled'),
  ('QL102','QL','HS-DEF','DMK','CNX','2026-05-15 09:45:00+07','2026-05-15 11:15:00+07',90,'scheduled'),
  ('QL103','QL','HS-GHI','BKK','SIN','2026-05-15 12:00:00+07','2026-05-15 15:30:00+07',330,'scheduled'),
  ('QL104','QL','HS-JKL','BKK','SYD','2026-05-15 23:59:00+07','2026-05-16 16:40:00+10',4341,'scheduled'),
  ('QL105','QL','HS-MNO','CNX','BKK','2026-05-15 14:20:00+07','2026-05-15 15:50:00+07',90,'scheduled'),
  ('QL106','QL','HS-PQR','SIN','BKK','2026-05-15 16:00:00+07','2026-05-15 19:30:00+07',210,'scheduled'),
  ('QL107','QL','HS-ABC','BKK','HKT','2026-05-15 11:00:00+07','2026-05-15 12:15:00+07',75,'scheduled'),
  ('QL108','QL','HS-DEF','HKT','BKK','2026-05-15 18:30:00+07','2026-05-15 19:45:00+07',75,'scheduled'),
  ('QL109','QL','HS-GHI','BKK','ICN','2026-05-15 02:00:00+07','2026-05-15 09:30:00+09',690,'scheduled'),
  ('QL110','QL','HS-JKL','ICN','BKK','2026-05-15 11:00:00+09','2026-05-15 16:30:00+07',330,'scheduled');

-- ------------------------------------------------------------
-- 5. SEAT INVENTORY
-- ------------------------------------------------------------
INSERT INTO seat_inventory (flight_id, seat_class, total_seats, available_seats, price_per_seat) VALUES
  (1,'economy',150,145,5000.00),
  (1,'business',20,18,15000.00),
  (2,'economy',159,155,4500.00),
  (2,'business',20,19,14000.00),
  (3,'economy',280,275,12000.00),
  (3,'business',30,28,45000.00),
  (3,'first',9,8,120000.00),
  (4,'economy',350,345,45000.00),
  (4,'business',35,33,120000.00),
  (4,'first',11,10,250000.00);

-- ------------------------------------------------------------
-- 6. BOOKINGS
-- ------------------------------------------------------------
INSERT INTO bookings (pnr, flight_id, passenger_count, total_amount, booking_status, booking_date, email, phone, special_requests) VALUES
  ('AA1B01',1,2,12500.00,'confirmed','2026-05-01 10:30:00+07','john.doe@email.com','+66812345678',NULL),
  ('AA1B02',2,1,4500.00,'confirmed','2026-05-02 14:15:00+07','jane.smith@email.com','+66823456789',NULL),
  ('AA1B03',3,3,45000.00,'confirmed','2026-05-03 09:20:00+07','bob.johnson@email.com','+66834567890','Vegetarian meal option'),
  ('AA1B04',4,1,45000.00,'confirmed','2026-05-04 16:45:00+07','alice.brown@email.com','+66845678901','Wheelchair assistance'),
  ('AA1B05',5,2,11000.00,'confirmed','2026-05-05 11:10:00+07','charlie.wilson@email.com','+66856789012',NULL),
  ('AA1B06',6,1,12000.00,'confirmed','2026-05-06 13:25:00+07','diana.miller@email.com','+66867890123','Extra legroom seat'),
  ('AA1B07',7,1,5000.00,'confirmed','2026-05-07 08:40:00+07','eve.taylor@email.com','+66878901234',NULL),
  ('AA1B08',8,2,10000.00,'confirmed','2026-05-08 15:55:00+07','frank.anderson@email.com','+66889012345','Early boarding'),
  ('AA1B09',9,1,45000.00,'confirmed','2026-05-09 12:00:00+07','grace.thomas@email.com','+66890123456',NULL),
  ('AA1B10',10,2,90000.00,'confirmed','2026-05-10 17:30:00+07','henry.jackson@email.com','+66801234567','Special meal request');

-- ------------------------------------------------------------
-- 7. PASSENGERS
-- ------------------------------------------------------------
INSERT INTO passengers (booking_id, first_name, last_name, date_of_birth, gender, nationality, passport_number, contact_email, contact_phone, special_assistance) VALUES
  (1,'John','Doe','1985-06-15','male','US','P12345678','john.doe@email.com','+66812345678',NULL),
  (1,'Jane','Doe','1988-09-22','female','US','P12345679','jane.doe@email.com','+66812345678',NULL),
  (2,'Alice','Smith','1990-03-10','female','UK','P23456789','alice.smith@email.com','+66823456789',NULL),
  (3,'Bob','Johnson','1975-12-05','male','CA','P34567890','bob.johnson@email.com','+66834567890','Vegetarian meal'),
  (3,'Carol','Johnson','1978-07-18','female','CA','P34567891','carol.johnson@email.com','+66834567890',NULL),
  (3,'David','Johnson','2010-04-22','male','CA','C34567892','david.johnson@email.com','+66834567890','Child'),
  (4,'Alice','Brown','1982-11-30','female','AU','P45678901','alice.brown@email.com','+66845678901','Wheelchair'),
  (5,'Charlie','Wilson','1995-01-25','male','NZ','P56789012','charlie.wilson@email.com','+66856789012',NULL),
  (5,'Diana','Wilson','1997-08-14','female','NZ','P56789013','diana.wilson@email.com','+66856789012',NULL),
  (6,'Diana','Miller','1980-05-08','female','DE','P67890123','diana.miller@email.com','+66867890123','Extra legroom');

-- ------------------------------------------------------------
-- 8. CHECKINS
-- ------------------------------------------------------------
INSERT INTO checkins (booking_id, passenger_id, checkin_datetime, seat_number, baggage_count, baggage_weight_kg, status) VALUES
  (1,1,'2026-05-15 06:30:00+07','12A',1,23.0,'completed'),
  (1,2,'2026-05-15 06:32:00+07','12B',1,20.0,'completed'),
  (2,3,'2026-05-15 08:15:00+07','24C',2,35.0,'completed'),
  (3,4,'2026-05-15 10:45:00+07','08F',3,50.0,'completed'),
  (3,5,'2026-05-15 10:46:00+07','08E',2,38.0,'completed'),
  (3,6,'2026-05-15 10:47:00+07','08D',1,15.0,'completed'),
  (4,7,'2026-05-15 21:30:00+07','42A',2,40.0,'completed'),
  (5,8,'2026-05-15 13:45:00+07','15C',1,25.0,'completed'),
  (5,9,'2026-05-15 13:46:00+07','15D',1,22.0,'completed'),
  (6,10,'2026-05-15 09:30:00+07','22B',2,30.0,'completed');

-- ------------------------------------------------------------
-- 9. BOARDING PASSES
-- ------------------------------------------------------------
INSERT INTO boarding_passes (pnr, passenger_name, flight_number, origin, destination, departure_time, gate, boarding_time, seat_number, qr_code_data, status, issued_at) VALUES
  ('AA1B01','John Doe','QL101','BKK','DMK','2026-05-15 08:00:00+07','G15','2026-05-15 07:30:00+07','12A','QRCODE_001','active','2026-05-15 06:30:00+07'),
  ('AA1B01','Jane Doe','QL101','BKK','DMK','2026-05-15 08:00:00+07','G15','2026-05-15 07:30:00+07','12B','QRCODE_002','active','2026-05-15 06:32:00+07'),
  ('AA1B02','Alice Smith','QL102','DMK','CNX','2026-05-15 09:45:00+07','G22','2026-05-15 08:45:00+07','24C','QRCODE_003','active','2026-05-15 08:15:00+07'),
  ('AA1B03','Bob Johnson','QL103','BKK','SIN','2026-05-15 12:00:00+07','G08','2026-05-15 11:00:00+07','08F','QRCODE_004','active','2026-05-15 10:45:00+07'),
  ('AA1B03','Carol Johnson','QL103','BKK','SIN','2026-05-15 12:00:00+07','G08','2026-05-15 11:00:00+07','08E','QRCODE_005','active','2026-05-15 10:46:00+07'),
  ('AA1B03','David Johnson','QL103','BKK','SIN','2026-05-15 12:00:00+07','G08','2026-05-15 11:00:00+07','08D','QRCODE_006','active','2026-05-15 10:47:00+00'),
  ('AA1B04','Alice Brown','QL104','BKK','SYD','2026-05-15 23:59:00+07','G05','2026-05-15 22:30:00+07','42A','QRCODE_007','active','2026-05-15 21:30:00+07'),
  ('AA1B05','Charlie Wilson','QL105','CNX','BKK','2026-05-15 14:20:00+07','G12','2026-05-15 13:20:00+07','15C','QRCODE_008','active','2026-05-15 13:45:00+07'),
  ('AA1B05','Diana Wilson','QL105','CNX','BKK','2026-05-15 14:20:00+07','G12','2026-05-15 13:20:00+07','15D','QRCODE_009','active','2026-05-15 13:46:00+07'),
  ('AA1B06','Diana Miller','QL106','SIN','BKK','2026-05-15 16:00:00+07','G20','2026-05-15 15:00:00+07','22B','QRCODE_010','active','2026-05-15 09:30:00+07');

-- ------------------------------------------------------------
-- 10. PAYMENTS
-- ------------------------------------------------------------
INSERT INTO payments (transaction_id, pnr, amount, currency, payment_method, status, payment_datetime, processor_ref) VALUES
  ('TXN001','AA1B01',12500.00,'THB','credit_card','completed','2026-05-01 10:35:00+07','PROC001'),
  ('TXN002','AA1B02',4500.00,'THB','debit_card','completed','2026-05-02 14:20:00+07','PROC002'),
  ('TXN003','AA1B03',45000.00,'THB','credit_card','completed','2026-05-03 09:25:00+07','PROC003'),
  ('TXN004','AA1B04',45000.00,'THB','bank_transfer','completed','2026-05-04 16:50:00+07','PROC004'),
  ('TXN005','AA1B05',11000.00,'THB','credit_card','completed','2026-05-05 11:15:00+07','PROC005'),
  ('TXN006','AA1B06',12000.00,'THB','mobile_payment','completed','2026-05-06 13:30:00+07','PROC006'),
  ('TXN007','AA1B07',5000.00,'THB','credit_card','completed','2026-05-07 08:45:00+07','PROC007'),
  ('TXN008','AA1B08',10000.00,'THB','debit_card','completed','2026-05-08 16:00:00+07','PROC008'),
  ('TXN009','AA1B09',45000.00,'THB','credit_card','completed','2026-05-09 12:05:00+07','PROC009'),
  ('TXN010','AA1B10',90000.00,'THB','bank_transfer','completed','2026-05-10 17:35:00+07','PROC010');

-- ------------------------------------------------------------
-- 11. REFUNDS
-- ------------------------------------------------------------
INSERT INTO refunds (refund_id, transaction_id, pnr, refund_amount, reason, status, processed_date) VALUES
  ('RF001','TXN001','AA1B01',12500.00,'Booking cancellation','processed','2026-05-10 14:20:00+07'),
  ('RF002','TXN005','AA1B05',11000.00,'Flight cancellation','pending','2026-05-12 09:30:00+07');

-- ------------------------------------------------------------
-- 12. AUDIT LOG
-- ------------------------------------------------------------
INSERT INTO audit_log (table_name, record_id, action, old_values, new_values, changed_by, change_timestamp) VALUES
  ('bookings',1,'INSERT','{}',{'pnr':'AA1B01','status':'confirmed'},'system','2026-05-01 10:30:00+07'),
  ('passengers',1,'INSERT','{}',{'booking_id':1,'name':'John Doe'},'system','2026-05-01 10:31:00+07'),
  ('payments',1,'INSERT','{}',{'transaction_id':'TXN001','amount':12500.00},'system','2026-05-01 10:35:00+07'),
  ('checkins',1,'INSERT','{}',{'booking_id':1,'status':'completed'},'staff_STF001','2026-05-15 06:30:00+07'),
  ('boarding_passes',1,'INSERT','{}',{'pnr':'AA1B01','status':'active'},'system','2026-05-15 06:30:00+07');

COMMIT;