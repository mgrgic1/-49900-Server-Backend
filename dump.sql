PGDMP                          x            CoinDB    13.0    13.0      �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    24700    CoinDB    DATABASE     l   CREATE DATABASE "CoinDB" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';
    DROP DATABASE "CoinDB";
                postgres    false            �            1259    24761    user_expenses    TABLE     �  CREATE TABLE public.user_expenses (
    expense_id integer NOT NULL,
    user_id integer NOT NULL,
    expense_monthly double precision NOT NULL,
    description character varying(200),
    real_amount double precision NOT NULL,
    real_frequency character varying(50) NOT NULL,
    "createdAt" date,
    "updatedAt" date,
    expense_type character varying(200) NOT NULL,
    expense_year integer,
    expense_month integer
);
 !   DROP TABLE public.user_expenses;
       public         heap    postgres    false            �            1259    24764    user_expenses_expense_id_seq    SEQUENCE     �   CREATE SEQUENCE public.user_expenses_expense_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.user_expenses_expense_id_seq;
       public          postgres    false    200            �           0    0    user_expenses_expense_id_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.user_expenses_expense_id_seq OWNED BY public.user_expenses.expense_id;
          public          postgres    false    201            �            1259    24766 
   user_goals    TABLE     =  CREATE TABLE public.user_goals (
    goal_id integer NOT NULL,
    user_id integer NOT NULL,
    amount_needed double precision NOT NULL,
    description character varying,
    reach_by_date date NOT NULL,
    "createdAt" date,
    "updatedAt" date,
    priority integer,
    "savingsTowardsGoal" double precision
);
    DROP TABLE public.user_goals;
       public         heap    postgres    false            �            1259    24772    user_goals_goal_id_seq    SEQUENCE     �   CREATE SEQUENCE public.user_goals_goal_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.user_goals_goal_id_seq;
       public          postgres    false    202            �           0    0    user_goals_goal_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.user_goals_goal_id_seq OWNED BY public.user_goals.goal_id;
          public          postgres    false    203            �            1259    24819    user_income    TABLE     �  CREATE TABLE public.user_income (
    income_id integer NOT NULL,
    user_id integer NOT NULL,
    income_monthly double precision NOT NULL,
    income_type character varying(50) NOT NULL,
    description character varying(200),
    real_amount double precision NOT NULL,
    real_frequency character varying(50) NOT NULL,
    "createdAt" date,
    "updatedAt" date,
    income_year integer,
    income_month integer
);
    DROP TABLE public.user_income;
       public         heap    postgres    false            �            1259    24817    user_income_income_id_seq    SEQUENCE     �   CREATE SEQUENCE public.user_income_income_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.user_income_income_id_seq;
       public          postgres    false    205            �           0    0    user_income_income_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.user_income_income_id_seq OWNED BY public.user_income.income_id;
          public          postgres    false    204            �            1259    24844    users    TABLE       CREATE TABLE public.users (
    id integer NOT NULL,
    "googleId" character varying NOT NULL,
    username character varying(200) NOT NULL,
    email character varying(100) NOT NULL,
    "totalBalance" double precision,
    "createdAt" date,
    "updatedAt" date
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    24842    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    207            �           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    206            6           2604    24783    user_expenses expense_id    DEFAULT     �   ALTER TABLE ONLY public.user_expenses ALTER COLUMN expense_id SET DEFAULT nextval('public.user_expenses_expense_id_seq'::regclass);
 G   ALTER TABLE public.user_expenses ALTER COLUMN expense_id DROP DEFAULT;
       public          postgres    false    201    200            7           2604    24784    user_goals goal_id    DEFAULT     x   ALTER TABLE ONLY public.user_goals ALTER COLUMN goal_id SET DEFAULT nextval('public.user_goals_goal_id_seq'::regclass);
 A   ALTER TABLE public.user_goals ALTER COLUMN goal_id DROP DEFAULT;
       public          postgres    false    203    202            8           2604    24822    user_income income_id    DEFAULT     ~   ALTER TABLE ONLY public.user_income ALTER COLUMN income_id SET DEFAULT nextval('public.user_income_income_id_seq'::regclass);
 D   ALTER TABLE public.user_income ALTER COLUMN income_id DROP DEFAULT;
       public          postgres    false    204    205    205            9           2604    24847    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    207    206    207            �          0    24761    user_expenses 
   TABLE DATA           �   COPY public.user_expenses (expense_id, user_id, expense_monthly, description, real_amount, real_frequency, "createdAt", "updatedAt", expense_type, expense_year, expense_month) FROM stdin;
    public          postgres    false    200   �&       �          0    24766 
   user_goals 
   TABLE DATA           �   COPY public.user_goals (goal_id, user_id, amount_needed, description, reach_by_date, "createdAt", "updatedAt", priority, "savingsTowardsGoal") FROM stdin;
    public          postgres    false    202   E'       �          0    24819    user_income 
   TABLE DATA           �   COPY public.user_income (income_id, user_id, income_monthly, income_type, description, real_amount, real_frequency, "createdAt", "updatedAt", income_year, income_month) FROM stdin;
    public          postgres    false    205   �'       �          0    24844    users 
   TABLE DATA           j   COPY public.users (id, "googleId", username, email, "totalBalance", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    207   �'       �           0    0    user_expenses_expense_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.user_expenses_expense_id_seq', 7, true);
          public          postgres    false    201            �           0    0    user_goals_goal_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.user_goals_goal_id_seq', 9, true);
          public          postgres    false    203            �           0    0    user_income_income_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.user_income_income_id_seq', 6, true);
          public          postgres    false    204            �           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 1, false);
          public          postgres    false    206            ;           2606    24780     user_expenses user_expenses_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.user_expenses
    ADD CONSTRAINT user_expenses_pkey PRIMARY KEY (expense_id);
 J   ALTER TABLE ONLY public.user_expenses DROP CONSTRAINT user_expenses_pkey;
       public            postgres    false    200            =           2606    24782    user_goals user_goals_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.user_goals
    ADD CONSTRAINT user_goals_pkey PRIMARY KEY (goal_id);
 D   ALTER TABLE ONLY public.user_goals DROP CONSTRAINT user_goals_pkey;
       public            postgres    false    202            ?           2606    24824    user_income user_income_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.user_income
    ADD CONSTRAINT user_income_pkey PRIMARY KEY (income_id);
 F   ALTER TABLE ONLY public.user_income DROP CONSTRAINT user_income_pkey;
       public            postgres    false    205            A           2606    24852    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    207            �   H   x�3�4�45�L-*�412�3�L-K-�LI�,���4202�54�50Ffgg�����8�̩aH� �o"�      �   <   x�3�4�440�LN##]C#]#c8� �i���eN�#�����X��=... �(
      �   L   x�3�4�440���,IUH��L-*�412�3�L-K-�LI�,���4202�54�50Fgrr��IJ����� �i"�      �      x������ � �     