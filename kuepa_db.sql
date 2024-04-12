DROP TABLE IF EXISTS "public"."conversations";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."conversations" (
    "id_conversacion" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "nombre" varchar,
    "createdAt" timestamp NOT NULL DEFAULT now(),
    "status" varchar NOT NULL DEFAULT 'abierta'::character varying,
    PRIMARY KEY ("id_conversacion")
);

DROP TABLE IF EXISTS "public"."mesagges";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."mesagges" (
    "id_message" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "text" varchar NOT NULL,
    "createdAt" timestamp NOT NULL DEFAULT now(),
    "conversation_id" uuid NOT NULL,
    "creator_id" uuid NOT NULL,
    CONSTRAINT "FK_c36aa24d31245708cc98798811c" FOREIGN KEY ("conversation_id") REFERENCES "public"."conversations"("id_conversacion"),
    CONSTRAINT "FK_c5c74e658eb16084f4a05c256e1" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("user_id"),
    PRIMARY KEY ("id_message")
);

DROP TABLE IF EXISTS "public"."rol";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."rol" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "rol" varchar NOT NULL,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."users";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."users" (
    "user_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "first_name" varchar NOT NULL,
    "last_name" varchar NOT NULL,
    "email" varchar NOT NULL,
    "password" varchar NOT NULL,
    "create_at" timestamp NOT NULL DEFAULT now(),
    "update_at" timestamp NOT NULL DEFAULT now(),
    "rol_id" uuid NOT NULL,
    CONSTRAINT "FK_685cb01ac5c88b5abb6bbe8aa60" FOREIGN KEY ("rol_id") REFERENCES "public"."rol"("id"),
    PRIMARY KEY ("user_id")
);

INSERT INTO "public"."conversations" ("id_conversacion", "nombre", "createdAt", "status") VALUES
('17f07a30-97da-4629-a174-408ee0893ed8', 'Clase virtual Programación', '2024-04-12 10:08:43.956084', 'abierta');


INSERT INTO "public"."mesagges" ("id_message", "text", "createdAt", "conversation_id", "creator_id") VALUES
('32079c0b-f769-4797-a9dc-893a18d9f6d8', 'Hola, Cómo vas?', '2024-04-12 12:57:02.974823', '17f07a30-97da-4629-a174-408ee0893ed8', '68c13b80-187e-427a-b1ef-536e2f9e9bfa');
INSERT INTO "public"."mesagges" ("id_message", "text", "createdAt", "conversation_id", "creator_id") VALUES
('a8166bce-88a5-4e7f-ad2a-87457c21f9e7', 'Que buena clase', '2024-04-12 13:00:52.711871', '17f07a30-97da-4629-a174-408ee0893ed8', 'f5f0c3e7-9c4d-4b4a-8aca-3a2244fbd950');
INSERT INTO "public"."mesagges" ("id_message", "text", "createdAt", "conversation_id", "creator_id") VALUES
('ad171bf7-df7b-4ad9-be41-c11a58e9c425', 'Sí', '2024-04-12 13:12:09.731704', '17f07a30-97da-4629-a174-408ee0893ed8', '68c13b80-187e-427a-b1ef-536e2f9e9bfa');

INSERT INTO "public"."rol" ("id", "rol") VALUES
('a658a7a6-80d2-4387-8f80-0227dade2662', 'ESTUDIANTE');
INSERT INTO "public"."rol" ("id", "rol") VALUES
('1cdbfdb2-f658-4b1a-ba71-06429e66c055', 'MODERADOR');


INSERT INTO "public"."users" ("user_id", "first_name", "last_name", "email", "password", "create_at", "update_at", "rol_id") VALUES
('68c13b80-187e-427a-b1ef-536e2f9e9bfa', 'Jhon ', 'Suarez', 'test@gmail.com', '$2b$10$rj/223Fqgm0K7mzEk/t.de0DSGnWTOZHiKEUEbA7nqi608gl8UegG', '2024-04-11 20:49:13.309964', '2024-04-11 20:49:13.309964', 'a658a7a6-80d2-4387-8f80-0227dade2662');
INSERT INTO "public"."users" ("user_id", "first_name", "last_name", "email", "password", "create_at", "update_at", "rol_id") VALUES
('f5f0c3e7-9c4d-4b4a-8aca-3a2244fbd950', 'Moderador', 'Moderador', 'moderador@gmail.com', '$2b$10$aQ5qBw0.LcTF2HuvQPLh.OhSThrrJlcOOrsWL5Ah9moYmNQ15Q3G6', '2024-04-12 11:23:43.157425', '2024-04-12 11:23:43.157425', '1cdbfdb2-f658-4b1a-ba71-06429e66c055');

