import { supabase } from './supabase-client'

/**
 * Submit a response report to Supabase database.
 * Privacy rule: if the operation fails, the report is silently discarded.
 * We never persist report data locally — it could contain message snippets.
 */
export const submitReport = async ({ reason, detail, messageSnippet, language, responseMode }) => {
  try {
    const { error } = await supabase
      .from('reports')
      .insert([
        {
          reason,
          detail: detail ? String(detail).replace(/<[^>]*>/g, '').slice(0, 500) : '',
          messageSnippet: messageSnippet ? String(messageSnippet).slice(0, 120) : '',
          language: language || 'en',
          responseMode: responseMode || 'standard',
          status: 'pending'
        }
      ])

    if (error) throw error
    return { success: true, source: 'supabase' }
  } catch (err) {
    console.error('Failed to save report to Supabase:', err)
    // Discard silently.
    // We do NOT store report data locally because it may contain message content.
    return { success: false, source: 'discarded' }
  }
}
