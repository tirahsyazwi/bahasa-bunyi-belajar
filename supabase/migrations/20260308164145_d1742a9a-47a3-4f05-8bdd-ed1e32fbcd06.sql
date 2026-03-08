
-- Update the handle_new_user_role function to make the first user an admin
CREATE OR REPLACE FUNCTION public.handle_new_user_role()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_count int;
BEGIN
  -- Always add student role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'student');
  
  -- If this is the first user, also make them admin + teacher
  SELECT count(*) INTO user_count FROM auth.users;
  IF user_count <= 1 THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin');
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'teacher');
  END IF;
  
  RETURN NEW;
END;
$$;
