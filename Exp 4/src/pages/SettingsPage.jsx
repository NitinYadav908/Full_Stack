import { useEffect, useState } from "react";

function SettingsPage() {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem(
      "socialflow_settings"
    );

    return saved
      ? JSON.parse(saved)
      : {
          name: "Nitin",
          email: "nitin@example.com",
          timezone: "Asia/Kolkata",
          notifications: true,
          emailNotifications: true,
          autoSave: true,
          compactMode: false,
        };
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    localStorage.setItem(
      "socialflow_settings",
      JSON.stringify(settings)
    );
  }, [settings]);

  const updateSetting = (key, value) => {
    setSettings((current) => ({
      ...current,
      [key]: value,
    }));

    setSaved(false);
  };

  const saveSettings = () => {
    localStorage.setItem(
      "socialflow_settings",
      JSON.stringify(settings)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <div className="page settings-page">

      <div className="page-header">

        <div>
          <h1>Settings</h1>

          <p>
            Manage your SocialFlow account and preferences.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={saveSettings}
        >
          Save Changes
        </button>

      </div>

      {saved && (
        <div className="settings-success">
          ✓ Settings saved successfully
        </div>
      )}

      <div className="settings-layout">

        <div className="settings-sidebar">

          <div className="settings-nav active">
            ⚙️ General
          </div>

        </div>

        <div className="settings-content">

          <section className="settings-section">

            <h2>Profile Information</h2>

            <p>
              Update your personal account information.
            </p>

            <div className="settings-avatar">
              N
            </div>

            <div className="settings-form">

              <div className="form-group">

                <label>
                  Full Name
                </label>

                <input
                  type="text"
                  value={settings.name}
                  onChange={(e) =>
                    updateSetting(
                      "name",
                      e.target.value
                    )
                  }
                />

              </div>

              <div className="form-group">

                <label>
                  Email Address
                </label>

                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) =>
                    updateSetting(
                      "email",
                      e.target.value
                    )
                  }
                />

              </div>

            </div>

          </section>

          <section className="settings-section">

            <h2>Notifications</h2>

            <p>
              Choose how you want to receive updates.
            </p>

            <div className="setting-row">

              <div>
                <strong>
                  Push Notifications
                </strong>

                <span>
                  Receive notifications about scheduled posts.
                </span>
              </div>

              <label className="switch">

                <input
                  type="checkbox"
                  checked={settings.notifications}
                  onChange={(e) =>
                    updateSetting(
                      "notifications",
                      e.target.checked
                    )
                  }
                />

                <span />

              </label>

            </div>

            <div className="setting-row">

              <div>
                <strong>
                  Email Notifications
                </strong>

                <span>
                  Receive important updates by email.
                </span>
              </div>

              <label className="switch">

                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={(e) =>
                    updateSetting(
                      "emailNotifications",
                      e.target.checked
                    )
                  }
                />

                <span />

              </label>

            </div>

          </section>

          <section className="settings-section">

            <h2>Application Settings</h2>

            <p>
              Customize how SocialFlow behaves.
            </p>

            <div className="setting-row">

              <div>
                <strong>
                  Auto Save Drafts
                </strong>

                <span>
                  Automatically save unfinished posts.
                </span>
              </div>

              <label className="switch">

                <input
                  type="checkbox"
                  checked={settings.autoSave}
                  onChange={(e) =>
                    updateSetting(
                      "autoSave",
                      e.target.checked
                    )
                  }
                />

                <span />

              </label>

            </div>

            <div className="setting-row">

              <div>
                <strong>
                  Compact Mode
                </strong>

                <span>
                  Use a more compact interface.
                </span>
              </div>

              <label className="switch">

                <input
                  type="checkbox"
                  checked={settings.compactMode}
                  onChange={(e) =>
                    updateSetting(
                      "compactMode",
                      e.target.checked
                    )
                  }
                />

                <span />

              </label>

            </div>

          </section>

          <section className="settings-section">

            <h2>Regional Settings</h2>

            <p>
              Configure your timezone.
            </p>

            <div className="settings-form">

              <div className="form-group">

                <label>
                  Timezone
                </label>

                <select
                  value={settings.timezone}
                  onChange={(e) =>
                    updateSetting(
                      "timezone",
                      e.target.value
                    )
                  }
                >

                  <option value="Asia/Kolkata">
                    India (IST)
                  </option>

                  <option value="America/New_York">
                    New York (EST)
                  </option>

                  <option value="Europe/London">
                    London (GMT)
                  </option>

                  <option value="Asia/Dubai">
                    Dubai (GST)
                  </option>

                </select>

              </div>

            </div>

          </section>

        </div>

      </div>

    </div>
  );
}

export default SettingsPage;