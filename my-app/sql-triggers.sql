-- This function runs every time a new user signs up.
-- It creates a corresponding row in the public.profiles table.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert a new profile record for the new user.
  -- The user's email from the OAuth provider is stored in email.
  -- name and student_id are left as NULL, to be filled in by the user later.
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  
  -- Also create a default settings entry for the user.
  INSERT INTO public.user_settings (user_id)
  VALUES (NEW.id);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- This trigger calls the function whenever a new user is created.
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users; -- Drop existing trigger if it exists
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
