export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '12.2.12 (cd3cf9e)';
  };
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          extensions?: Json;
          operationName?: string;
          query?: string;
          variables?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      doctors: {
        Row: {
          id: string;
          isResident: boolean;
          profileId: string;
        };
        Insert: {
          id?: string;
          isResident: boolean;
          profileId: string;
        };
        Update: {
          id?: string;
          isResident?: boolean;
          profileId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'fkProfileIdToProfilesInDoctors';
            columns: ['profileId'];
            isOneToOne: true;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      employees: {
        Row: {
          contractType: Database['public']['Enums']['contractType'];
          cuil: string;
          exitDate: string | null;
          id: string;
          netSalary: number;
          profileId: string;
          startDate: string;
        };
        Insert: {
          contractType: Database['public']['Enums']['contractType'];
          cuil: string;
          exitDate?: string | null;
          id?: string;
          netSalary: number;
          profileId: string;
          startDate: string;
        };
        Update: {
          contractType?: Database['public']['Enums']['contractType'];
          cuil?: string;
          exitDate?: string | null;
          id?: string;
          netSalary?: number;
          profileId?: string;
          startDate?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'fkProfileIdToProfilesInEmployees';
            columns: ['profileId'];
            isOneToOne: true;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      employeeSchedules: {
        Row: {
          employeeId: string;
          endTime: string;
          id: string;
          isRemote: boolean;
          startTime: string;
          weekday: number;
        };
        Insert: {
          employeeId: string;
          endTime: string;
          id?: string;
          isRemote?: boolean;
          startTime: string;
          weekday: number;
        };
        Update: {
          employeeId?: string;
          endTime?: string;
          id?: string;
          isRemote?: boolean;
          startTime?: string;
          weekday?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'fkEmployeeIdToEmployeesInEmployeesSchedules';
            columns: ['employeeId'];
            isOneToOne: false;
            referencedRelation: 'employees';
            referencedColumns: ['id'];
          },
        ];
      };
      expenseCategories: {
        Row: {
          id: number;
          name: string;
          type: Database['public']['Enums']['expenseCategoryType'];
        };
        Insert: {
          id?: number;
          name: string;
          type: Database['public']['Enums']['expenseCategoryType'];
        };
        Update: {
          id?: number;
          name?: string;
          type?: Database['public']['Enums']['expenseCategoryType'];
        };
        Relationships: [];
      };
      expenses: {
        Row: {
          amount: number;
          categoryId: number;
          createdAt: string | null;
          createdBy: string;
          datePaid: string | null;
          description: string | null;
          expirationDate: string;
          id: string;
          invoiceLink: string;
          organizationId: string;
          paymentMethodId: number | null;
          paymentReceiptLink: string | null;
          status: Database['public']['Enums']['expenseStatus'];
          title: string;
          updatedAt: string | null;
          updatedBy: string | null;
        };
        Insert: {
          amount: number;
          categoryId: number;
          createdAt?: string | null;
          createdBy: string;
          datePaid?: string | null;
          description?: string | null;
          expirationDate: string;
          id?: string;
          invoiceLink: string;
          organizationId: string;
          paymentMethodId?: number | null;
          paymentReceiptLink?: string | null;
          status: Database['public']['Enums']['expenseStatus'];
          title: string;
          updatedAt?: string | null;
          updatedBy?: string | null;
        };
        Update: {
          amount?: number;
          categoryId?: number;
          createdAt?: string | null;
          createdBy?: string;
          datePaid?: string | null;
          description?: string | null;
          expirationDate?: string;
          id?: string;
          invoiceLink?: string;
          organizationId?: string;
          paymentMethodId?: number | null;
          paymentReceiptLink?: string | null;
          status?: Database['public']['Enums']['expenseStatus'];
          title?: string;
          updatedAt?: string | null;
          updatedBy?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'expenses_categoryId_fkey';
            columns: ['categoryId'];
            isOneToOne: false;
            referencedRelation: 'expenseCategories';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'expenses_organizationId_fkey';
            columns: ['organizationId'];
            isOneToOne: false;
            referencedRelation: 'organizations';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'expenses_payment_method_id_fkey';
            columns: ['paymentMethodId'];
            isOneToOne: false;
            referencedRelation: 'paymentMethods';
            referencedColumns: ['id'];
          },
        ];
      };
      organizations: {
        Row: {
          address: string;
          businessName: string;
          cuit: string;
          id: string;
          legalName: string;
          vatCategoryId: number;
        };
        Insert: {
          address: string;
          businessName: string;
          cuit: string;
          id?: string;
          legalName: string;
          vatCategoryId: number;
        };
        Update: {
          address?: string;
          businessName?: string;
          cuit?: string;
          id?: string;
          legalName?: string;
          vatCategoryId?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'organizations_vat_category_id_fkey';
            columns: ['vatCategoryId'];
            isOneToOne: false;
            referencedRelation: 'vatCategories';
            referencedColumns: ['id'];
          },
        ];
      };
      patients: {
        Row: {
          healthInsuranceName: string;
          id: string;
          profileId: string;
        };
        Insert: {
          healthInsuranceName: string;
          id?: string;
          profileId: string;
        };
        Update: {
          healthInsuranceName?: string;
          id?: string;
          profileId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'fkProfileIdToProfilesInPatients';
            columns: ['profileId'];
            isOneToOne: true;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      paymentMethods: {
        Row: {
          id: number;
          name: string;
          type: Database['public']['Enums']['paymentMethodType'];
        };
        Insert: {
          id?: number;
          name: string;
          type: Database['public']['Enums']['paymentMethodType'];
        };
        Update: {
          id?: number;
          name?: string;
          type?: Database['public']['Enums']['paymentMethodType'];
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          address: string | null;
          birthDate: string;
          documentType: Database['public']['Enums']['documentType'];
          documentValue: string;
          email: string;
          gender: Database['public']['Enums']['gender'];
          id: string;
          lastName: string;
          name: string;
          phone: string | null;
        };
        Insert: {
          address?: string | null;
          birthDate: string;
          documentType: Database['public']['Enums']['documentType'];
          documentValue: string;
          email: string;
          gender: Database['public']['Enums']['gender'];
          id: string;
          lastName: string;
          name: string;
          phone?: string | null;
        };
        Update: {
          address?: string | null;
          birthDate?: string;
          documentType?: Database['public']['Enums']['documentType'];
          documentValue?: string;
          email?: string;
          gender?: Database['public']['Enums']['gender'];
          id?: string;
          lastName?: string;
          name?: string;
          phone?: string | null;
        };
        Relationships: [];
      };
      profilesRoles: {
        Row: {
          id: string;
          profileId: string;
          roleId: number;
        };
        Insert: {
          id?: string;
          profileId: string;
          roleId: number;
        };
        Update: {
          id?: string;
          profileId?: string;
          roleId?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'fkProfileIdToProfilesInProfilesRoles';
            columns: ['profileId'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'fkRoleIdToRolesInProfilesRoles';
            columns: ['roleId'];
            isOneToOne: false;
            referencedRelation: 'roles';
            referencedColumns: ['id'];
          },
        ];
      };
      roles: {
        Row: {
          description: string | null;
          id: number;
          name: string;
        };
        Insert: {
          description?: string | null;
          id?: number;
          name: string;
        };
        Update: {
          description?: string | null;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      usersOrganizations: {
        Row: {
          organizationId: string;
          profileId: string;
        };
        Insert: {
          organizationId: string;
          profileId: string;
        };
        Update: {
          organizationId?: string;
          profileId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'fkOrganizationIdToOrganizationsInUsersOrganizations';
            columns: ['organizationId'];
            isOneToOne: false;
            referencedRelation: 'organizations';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'fkProfileIdToProfilesInUsersOrganizations';
            columns: ['profileId'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      vatCategories: {
        Row: {
          id: number;
          name: string;
          type: Database['public']['Enums']['vatCategoryType'];
        };
        Insert: {
          id?: number;
          name: string;
          type: Database['public']['Enums']['vatCategoryType'];
        };
        Update: {
          id?: number;
          name?: string;
          type?: Database['public']['Enums']['vatCategoryType'];
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      create_full_user: {
        Args: {
          p_doctor?: Json;
          p_employee?: Json;
          p_orgs: string[];
          p_patient?: Json;
          p_profile: Json;
          p_role_ids?: number[];
          p_user_id: string;
        };
        Returns: undefined;
      };
      update_full_user: {
        Args: {
          p_doctor?: Json;
          p_employee?: Json;
          p_orgs: string[];
          p_patient?: Json;
          p_profile: Json;
          p_role_ids?: number[];
          p_user_id: string;
        };
        Returns: undefined;
      };
    };
    Enums: {
      contractType: 'singleTax' | 'dependent';
      documentType: 'dni' | 'le' | 'lc' | 'ci' | 'passport' | 'other';
      expenseCategoryType:
        | 'operating'
        | 'service'
        | 'supply'
        | 'miscellaneous'
        | 'extraordinary'
        | 'salary'
        | 'daily'
        | 'fuel'
        | 'perception'
        | 'stationery'
        | 'cleaning'
        | 'maintenance'
        | 'capture';
      expenseStatus: 'paid' | 'pending';
      gender: 'male' | 'female' | 'other';
      paymentMethodType: 'cash' | 'bna' | 'mp' | 'galicia' | 'bbva' | 'uala' | 'brubank';
      vatCategoryType:
        | 'registeredResponsible'
        | 'monotax'
        | 'exempt'
        | 'notResponsible'
        | 'finalConsumer'
        | 'uncategorizedSubject'
        | 'unregisteredResponsible'
        | 'subjectToVatWithholding'
        | 'notSubjectToVat'
        | 'registeredResponsibleM';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables'] | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables'] | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums'] | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      contractType: ['singleTax', 'dependent'],
      documentType: ['dni', 'le', 'lc', 'ci', 'passport', 'other'],
      expenseCategoryType: [
        'operating',
        'service',
        'supply',
        'miscellaneous',
        'extraordinary',
        'salary',
        'daily',
        'fuel',
        'perception',
        'stationery',
        'cleaning',
        'maintenance',
        'capture',
      ],
      expenseStatus: ['paid', 'pending'],
      gender: ['male', 'female', 'other'],
      paymentMethodType: ['cash', 'bna', 'mp', 'galicia', 'bbva', 'uala', 'brubank'],
      vatCategoryType: [
        'registeredResponsible',
        'monotax',
        'exempt',
        'notResponsible',
        'finalConsumer',
        'uncategorizedSubject',
        'unregisteredResponsible',
        'subjectToVatWithholding',
        'notSubjectToVat',
        'registeredResponsibleM',
      ],
    },
  },
} as const;
