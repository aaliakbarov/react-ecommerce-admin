import ProfileSettings from '@/features/settings/ProfileSettings';

export default function Settings() {
    return (
        <div className='space-y-8 max-w-3xl mx-auto px-4 py-6'>
            <header className='space-y-1'>
                <h1 className='text-3xl font-semibold tracking-tight'>
                    Settings
                </h1>
                <p className='text-muted-foreground text-sm'>
                    Manage your private options.
                </p>
            </header>

            <section className='space-y-6'>
                <ProfileSettings />
            </section>
        </div>
    );
}
