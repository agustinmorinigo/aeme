import supabase from '@/client';

export default async function signOut(): Promise<void> {
    const { error } = await supabase.auth.signOut();

    if (error) {
        throw error;
    }
}
