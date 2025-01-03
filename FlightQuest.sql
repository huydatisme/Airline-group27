PGDMP  /                    |            flyquest    16.3    16.3                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    98372    flyquest    DATABASE     �   CREATE DATABASE flyquest WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE flyquest;
                postgres    false            �            1259    106564    account    TABLE     �   CREATE TABLE public.account (
    account_id character varying(255) NOT NULL,
    account_name character varying(255),
    account_password character varying(255),
    account_email character varying(255),
    account_role character varying(255)
);
    DROP TABLE public.account;
       public         heap    postgres    false            �            1259    114817    airline    TABLE     �   CREATE TABLE public.airline (
    airlineid character varying(255) NOT NULL,
    name character varying(255),
    airlinecode character varying(30)
);
    DROP TABLE public.airline;
       public         heap    postgres    false            �            1259    114831    airport    TABLE     �   CREATE TABLE public.airport (
    airportid character varying(255) NOT NULL,
    location character varying(255),
    name character varying(255),
    airportcode character varying(3),
    country character varying(30)
);
    DROP TABLE public.airport;
       public         heap    postgres    false            �            1259    114824    flight    TABLE     �  CREATE TABLE public.flight (
    flightid character varying(255) NOT NULL,
    airlineid character varying(255),
    flightnumber character varying(255),
    departureid character varying(255),
    destinationid character varying(255),
    availableeconomyseat integer,
    price integer,
    departuretime timestamp without time zone,
    expectedarrival timestamp without time zone,
    availablebusinessseat integer,
    availablefirstclassseat integer
);
    DROP TABLE public.flight;
       public         heap    postgres    false            �            1259    114810    tickethistory    TABLE       CREATE TABLE public.tickethistory (
    flightid character varying(255) NOT NULL,
    accountid character varying(255) NOT NULL,
    datebooked timestamp without time zone,
    ticketstate integer,
    seattype integer,
    ticketid character varying NOT NULL
);
 !   DROP TABLE public.tickethistory;
       public         heap    postgres    false            �          0    106564    account 
   TABLE DATA           j   COPY public.account (account_id, account_name, account_password, account_email, account_role) FROM stdin;
    public          postgres    false    215   �       �          0    114817    airline 
   TABLE DATA           ?   COPY public.airline (airlineid, name, airlinecode) FROM stdin;
    public          postgres    false    217   �                 0    114831    airport 
   TABLE DATA           R   COPY public.airport (airportid, location, name, airportcode, country) FROM stdin;
    public          postgres    false    219   $!                  0    114824    flight 
   TABLE DATA           �   COPY public.flight (flightid, airlineid, flightnumber, departureid, destinationid, availableeconomyseat, price, departuretime, expectedarrival, availablebusinessseat, availablefirstclassseat) FROM stdin;
    public          postgres    false    218   �*       �          0    114810    tickethistory 
   TABLE DATA           i   COPY public.tickethistory (flightid, accountid, datebooked, ticketstate, seattype, ticketid) FROM stdin;
    public          postgres    false    216   �+       `           2606    106570    account account_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_pkey PRIMARY KEY (account_id);
 >   ALTER TABLE ONLY public.account DROP CONSTRAINT account_pkey;
       public            postgres    false    215            d           2606    114823    airline airline_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.airline
    ADD CONSTRAINT airline_pkey PRIMARY KEY (airlineid);
 >   ALTER TABLE ONLY public.airline DROP CONSTRAINT airline_pkey;
       public            postgres    false    217            h           2606    114837    airport airport_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.airport
    ADD CONSTRAINT airport_pkey PRIMARY KEY (airportid);
 >   ALTER TABLE ONLY public.airport DROP CONSTRAINT airport_pkey;
       public            postgres    false    219            f           2606    114830    flight flight_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.flight
    ADD CONSTRAINT flight_pkey PRIMARY KEY (flightid);
 <   ALTER TABLE ONLY public.flight DROP CONSTRAINT flight_pkey;
       public            postgres    false    218            b           2606    122957     tickethistory tickethistory_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.tickethistory
    ADD CONSTRAINT tickethistory_pkey PRIMARY KEY (ticketid);
 J   ALTER TABLE ONLY public.tickethistory DROP CONSTRAINT tickethistory_pkey;
       public            postgres    false    216            k           2606    114860    flight fk_flight_airline    FK CONSTRAINT     �   ALTER TABLE ONLY public.flight
    ADD CONSTRAINT fk_flight_airline FOREIGN KEY (airlineid) REFERENCES public.airline(airlineid);
 B   ALTER TABLE ONLY public.flight DROP CONSTRAINT fk_flight_airline;
       public          postgres    false    4708    217    218            l           2606    114865 "   flight fk_flight_departure_airport    FK CONSTRAINT     �   ALTER TABLE ONLY public.flight
    ADD CONSTRAINT fk_flight_departure_airport FOREIGN KEY (departureid) REFERENCES public.airport(airportid);
 L   ALTER TABLE ONLY public.flight DROP CONSTRAINT fk_flight_departure_airport;
       public          postgres    false    4712    219    218            m           2606    114870 $   flight fk_flight_destination_airport    FK CONSTRAINT     �   ALTER TABLE ONLY public.flight
    ADD CONSTRAINT fk_flight_destination_airport FOREIGN KEY (destinationid) REFERENCES public.airport(airportid);
 N   ALTER TABLE ONLY public.flight DROP CONSTRAINT fk_flight_destination_airport;
       public          postgres    false    219    218    4712            i           2606    114850 &   tickethistory fk_tickethistory_account    FK CONSTRAINT     �   ALTER TABLE ONLY public.tickethistory
    ADD CONSTRAINT fk_tickethistory_account FOREIGN KEY (accountid) REFERENCES public.account(account_id);
 P   ALTER TABLE ONLY public.tickethistory DROP CONSTRAINT fk_tickethistory_account;
       public          postgres    false    216    4704    215            j           2606    114845 %   tickethistory fk_tickethistory_flight    FK CONSTRAINT     �   ALTER TABLE ONLY public.tickethistory
    ADD CONSTRAINT fk_tickethistory_flight FOREIGN KEY (flightid) REFERENCES public.flight(flightid);
 O   ALTER TABLE ONLY public.tickethistory DROP CONSTRAINT fk_tickethistory_flight;
       public          postgres    false    218    4710    216            �   �   x�M��N�0 �k�\׏�Pz�& 6��n>Z�p��ip<�م�/pӈ�']�<OHtU��т����2�ڲ��ɖ͎��-+��_��d�T-��.��.*V'��sM��߼���w��4`�S=�S�D)�9W�h�V�L�b�2Q�ﴆ[�����ѿ�[�^�a���LӐ�}�4eQ��O!�t� <�}�Svw�ߺ+�sr���_��F�      �   �  x�E�Mn1���)|�B?%.$A�\#�����I13A��W.�zG����Zo$��:@,�=���W�AѼL��|����m�ռ<YΎ[��Qp�b撤SL���eZx��<|��9O��1x�k�踲�ф��4ͯ��}�'Vs:Z)
�'�R4{�E���]�̑7^��'�^����"����h�A�A@���[�mZ�������^"A��p���o����ѷ3�+��W�����k���k�\�+K6c��q�Y��m�E@��
Ra��s�Ru�^�6����ھ?X\�� U��r�dT]�x�<O��[T�{Kڛ�N��ya��AwTZ.�L����m�L�����!�4��0�9�l�O]������b��x���         �	  x��XKr�\7N1;�,O�?K�#��O"H=I�Muw�0��c H�V��O��Q�M|�H$ 1GX�n�DNwUVV���T�e��!�Cp�4�6�J�$+N���[�����Y�档u�w������kq:��[^w��X-k�2y�M��pV��P'#.�.��8eZχ�����F�u�su�v�s��D�dl8�)�4��*��M%r�ڈ�4�+q8�a��*suB�ł���G'��@]�I��W��^.�rd�Աq5+Im"�?�{�y�����Ӂbu�lZ�j�db[��%t�N�;�]�1�+�Z}���]?�7���^��ι�8?�yۛ���o����ƒ���1#9��i�w�o�ChWմ�����=/��~x��х�����X�Bp��#PM�����c/��5�A���o聺IH�%G��QFڀ�5��lIU�3���%��*���n�fgW�NL2�T8$~�@$9*�u!_���>W�x�v�({~���I�40Q��&�<��>�&����l���n��f*NxXR�8q����ײ��eN�sЪ	b�\�8���]5K��a��7���2�9��j�D�R��x_po�f	8#�^EY�sǏO�.x��t�Z�hi�u��A&�d�����̍L�D���n�?��[�a�w{���'qHe��q8����l|p�tʾў�y�8[�����v�E9�݊��pϏ�ڱuڪF��85r2�`Q\���q?Bti�{Ouv����y�&D�dĔM����ɂ|�Ŭ��~���4��T�o������x�n�mj�~���kq���\�˨B���;���\�:P$���6�i���f�?�9��ǿ����V[��鑘=P�Mr6�\]�c��ȹ�&��H%.�U꿊��K^?�~O(f���f�S�4%�Nm�5�b����Q(���^�6_Hq��o�����ڑ��e�9_E���\�}�K(D+.7�QG�s�p�j6o���-�?/��חHn�q��E6�CD�-�Ȱ'
΋��P�^�����a=�аY��}�wrs'��.&Aդj����5���z��v�h�:��f�,�_U7��[Z�}�~su�Ļiڄ;X������K����俵���~����<���[iT Js� ��2��*���`g��"_�M�v��+���'�V��D*�/	��mb*� E������!��kuHh�}���O��v�E�YA^��ŧ���k�����T]l���{���.Pcz�]C�4�t҃��Љ�f��yL�N!�02K�����xGk&��oY�bǴ���xA�Qy!y���x�;����Ϗ�*!%���0�m�?����p��w�w@�>����}]��ӱ���[O�Er����h�դ�:?vA�-�c{�Ͻ���)���w�뛣�_&������pN&�-6��:�b����`�Uiy�������%�~��]�ۋEr!iP�l�b��[�ϼ8�łVO�_^���������
��*�5�Āz�C���u���%q����}��W/`�l�.h���2�@V6��N�܈˖���j>�� m`�����SFi
Q�֬�Յ#��`G'�B���O�__�����X���b��d����(:,�׋���[J�r_Jg�//!�T����6��+Ym�$�M�e��í�
�}�����E_�d��C
L_->m��ǲ��ts*f_����i"�n@�ȵlL��o�b�}�$Q�v����{Zvɾ;g�@��b�.���F딾��
��67����t׶��0�ߥ�o`G�r�n��8��g��L���4�zq�?p7'��O۝��=����=8��кb["�:��uRV��f�+H���p�S��6j!�u6Z�0�H�C���4�2�9Zx����[Pp���B��ǐ���Bv;m\-���1�Z�z���	�T��x�CX����ᇛ-*r��Fn�k\��� �����({���|�f׻�]�Rf	�9r���ѫTr^;���f:�r]��D��1%fB	��1}j�C�I3D<��l�K\~��׿~�y���[�܀=96Eט���PC�d��~��0޵��9`@�m�/v��
�^�)HF9��´7�5ʚF�x���~�����B����L�T�ل�4�:j0�(Ƅ7��ݦO��>���p:N5������	�Ĩ��g�a���^�@�?�n!MvR5@ _ ���j�Z�9���ALNZ�nv0���m�ǈ�P�R���h�0�J&4���ݦE=����yF�;�B�c�G���7LЫb~h	������v�;��ƅ��"Q�F�2!k�BC��������g��+�����(��`�G���@��������R�ނ԰I2Y����n��c㡴�B�F�D��O;N���������c�^YtpxD�`�C���寯&�� [��          �   x��ϻmC1@�Zo
/`��"e*7I�?B��0\8���<�P��xn�X�=�Jtm_�r����i��ȉ����(*k?�H���d-Ha�.�GU�i�w���9	�Q��{W`�ؠa24�+ҕ��p��6�M�� ���B�3�f<�؊�?~�����7�^��/��ѳ�ɿߎ���B[q      �   �   x����m1��3U����50��b��	��D�J\�����2��-53Ъ@h�掜�d�3��%IF(I� �]|���^_@�)�fn�r��W-ٙ"�g��GQ�p]����$ |(�&!��K�a��c�����F�7��@�uDS}�@eY-��xCi�#����m�Q�킕�8��#jFw�D���ր	���CHy����!K������CҢ��bڶa
�NMc螣����w����;�g     