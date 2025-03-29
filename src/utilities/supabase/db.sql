
CREATE TABLE public.user_details (
    id uuid NOT NULL,
    "isSubscriber" boolean DEFAULT false,
    name character varying,
    created_at timestamp without time zone DEFAULT NOW(),
    updated_at timestamp without time zone DEFAULT NOW()
);

ALTER TABLE ONLY public.user_details
    ADD CONSTRAINT "UserSubscription_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE public.user_details ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to select their own user details"
    ON public.user_details FOR SELECT
    TO authenticated
    USING ((( SELECT auth.uid() AS uid) = id));

CREATE POLICY "Allow authenticated users to update their own user details"
    ON public.user_details FOR UPDATE
    TO authenticated
    USING ((( SELECT auth.uid() AS uid) = id))
    WITH CHECK ((( SELECT auth.uid() AS uid) = id));

CREATE POLICY "Allow supabase_auth_admin to insert new user details"
    ON public.user_details FOR INSERT
    TO supabase_auth_admin
    WITH CHECK (true);

GRANT INSERT ON TABLE public.user_details TO supabase_auth_admin;


CREATE FUNCTION public.handle_new_user() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    BEGIN
        INSERT INTO public.user_details (id)
        VALUES (NEW.id);
        RETURN NEW;
    END;
    $$;


CREATE TRIGGER after_user_created 
AFTER INSERT ON auth.users 
FOR EACH ROW 
EXECUTE FUNCTION public.handle_new_user();
