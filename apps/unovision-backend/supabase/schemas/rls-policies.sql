-- ============================================================================
-- RLS POLICIES WITH DEPENDENCIES
-- ============================================================================
-- Políticas RLS que dependen de múltiples tablas
-- DEPENDENCIAS: profiles.sql, profilesRoles.sql, employees.sql, doctors.sql, patients.sql

-- Políticas para profiles que dependen de profilesRoles
CREATE POLICY "Profiles - admin full access" ON "public"."profiles" TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "public"."profilesRoles" "pr"
  WHERE (("pr"."profileId" = "auth"."uid"()) AND ("pr"."roleId" = 1)))));

-- Políticas para employees que dependen de profilesRoles
CREATE POLICY "Employees - user or admin" ON "public"."employees" TO "authenticated" USING ((("profileId" = "auth"."uid"()) OR (EXISTS ( SELECT 1
   FROM "public"."profilesRoles" "pr"
  WHERE (("pr"."profileId" = "auth"."uid"()) AND ("pr"."roleId" = 1)))))) WITH CHECK ((("profileId" = "auth"."uid"()) OR (EXISTS ( SELECT 1
   FROM "public"."profilesRoles" "pr"
  WHERE (("pr"."profileId" = "auth"."uid"()) AND ("pr"."roleId" = 1))))));

-- Políticas para employeeSchedules que dependen de employees y profilesRoles
CREATE POLICY "Schedules - user or admin" ON "public"."employeeSchedules" TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "public"."employees" "e"
  WHERE (("e"."id" = "employeeSchedules"."employeeId") AND (("e"."profileId" = "auth"."uid"()) OR (EXISTS ( SELECT 1
           FROM "public"."profilesRoles" "pr"
          WHERE (("pr"."profileId" = "auth"."uid"()) AND ("pr"."roleId" = 1))))))))) WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."employees" "e"
  WHERE (("e"."id" = "employeeSchedules"."employeeId") AND (("e"."profileId" = "auth"."uid"()) OR (EXISTS ( SELECT 1
           FROM "public"."profilesRoles" "pr"
          WHERE (("pr"."profileId" = "auth"."uid"()) AND ("pr"."roleId" = 1)))))))));

-- Políticas para doctors que dependen de profilesRoles
CREATE POLICY "Doctors - user or admin" ON "public"."doctors" TO "authenticated" USING ((("profileId" = "auth"."uid"()) OR (EXISTS ( SELECT 1
   FROM "public"."profilesRoles" "pr"
  WHERE (("pr"."profileId" = "auth"."uid"()) AND ("pr"."roleId" = 1)))))) WITH CHECK ((("profileId" = "auth"."uid"()) OR (EXISTS ( SELECT 1
   FROM "public"."profilesRoles" "pr"
  WHERE (("pr"."profileId" = "auth"."uid"()) AND ("pr"."roleId" = 1))))));

-- Políticas para patients que dependen de profilesRoles
CREATE POLICY "Patients - user or admin" ON "public"."patients" TO "authenticated" USING ((("profileId" = "auth"."uid"()) OR (EXISTS ( SELECT 1
   FROM "public"."profilesRoles" "pr"
  WHERE (("pr"."profileId" = "auth"."uid"()) AND ("pr"."roleId" = 1)))))) WITH CHECK ((("profileId" = "auth"."uid"()) OR (EXISTS ( SELECT 1
   FROM "public"."profilesRoles" "pr"
  WHERE (("pr"."profileId" = "auth"."uid"()) AND ("pr"."roleId" = 1))))));